---
title: 'Training-Inference Discrepancy in LLM Reinforcement Learning'
date: '2025-11-01'
lastModified: '2026-05-26'
tags: ['reinforcement-learning', 'llm', 'rl', 'quantization', 'training']
description: 'How quantization in inference engines secretly turns on-policy RL into off-policy training, and how adaptive control can fix it.'
---

VERL (Volcano Engine Reinforcement Learning) is an efficient RL framework for LLMs. It consists of an inference engine and a trainer engine. The RL loop for LLMs works as follows: the inference engine produces rollouts — sequences of LLM outputs — which are then evaluated by a reward model. These evaluated rollouts guide the trainer to perform policy updates. In principle, this is on-policy learning: the policy being trained should be the same policy generating the rollouts.

In practice, they are not the same.

## Why training and inference diverge

Modern inference engines optimize aggressively for throughput. The most effective and widely-used optimization is quantization — representing model weights and activations in lower-bit formats like FP8 or INT8 instead of the BF16 used during training. This speeds up computation and saves memory, but it introduces a subtle problem: the quantized inference policy μ and the high-precision training policy π no longer produce identical probability distributions for the same input.

There are also lower-level causes: training engines (e.g., FSDP, Megatron) and inference engines (e.g., vLLM, SGLang) use different backend implementations and operation kernels, introducing additional divergence. Together, these factors create what we call the **training-inference discrepancy**.

## On-policy becomes off-policy

The standard GRPO objective computes an importance ratio r using the training policy π, but the expectation is taken over samples drawn from the inference policy μ. When μ ≠ π, this mismatch turns what should be on-policy learning into off-policy learning. The discrepancy propagates through successive policy updates, amplifying instability and eventually causing training collapse.

This is not a hypothetical edge case. In FP8-quantized inference setups, the training-inference discrepancy can be large enough to derail training entirely within a few hundred steps.

## Existing fixes and their limits

Two families of solutions have been proposed:

**Precision alignment** — use the same data format on both sides (e.g., BF16 everywhere, or FP8 everywhere). BF16 alignment preserves accuracy but leaves significant hardware performance on the table. FP8 alignment stabilizes training but loses accuracy compared to BF16 baselines. More fundamentally, alignment can't fix non-precision discrepancies (e.g., kernel-level differences) and doesn't generalize across inference engines.

**Importance Sampling (IS)** — apply a correction ratio ρ = π/μ to the gradient to account for the distribution mismatch. Token-level IS applies per-token ratios but yields a biased gradient estimator. Sequence-level IS uses a single ratio per sequence and is unbiased, but the weights become vanishingly small at low precision, causing convergence failure.

Both approaches treat the discrepancy as a problem to eliminate. But eliminating it entirely is neither possible nor desirable.

## A different perspective: adaptive control

The key insight of our work is that the training-inference discrepancy should not be driven to zero — it should be **controlled within a reasonable range**.

If the discrepancy is too large, policy updates become biased and training collapses. But if it is too small, the model is artificially confined to a narrow set of weights that happen to match the quantized policy, preventing exploration and hurting accuracy. In the extreme case where E = 0, the model weights would need to exactly equal their quantized values — meaning no training can occur at all.

We propose **Adaptive Control Reinforcement Learning (ACRL)**, which measures the sequence-level discrepancy and uses it as a reference to dynamically adjust token-level gradient ratios. ACRL prevents the discrepancy from growing into collapse while also preventing it from shrinking to the point of accuracy loss. A useful side effect is that maintaining a moderate discrepancy naturally increases policy entropy, encouraging exploration and improving final accuracy.

## Results

Under aggressive FP8 quantization, ACRL stabilizes RL training that would otherwise collapse. On mathematical reasoning benchmarks (GSM8K, AIME, HMMT, AMC, MATH500), ACRL-trained models match the accuracy of BF16 baselines and substantially outperform importance sampling fixes.

The paper was submitted to ICML 2026, received reviews of 4 and 3, and was borderline rejected. We are now submitting to TMLR and will post it on arXiv shortly.

---

*The core idea is simple: don't fight the discrepancy — regulate it. The same principle applies broadly to any RL training setup where inference and training diverge, whether from quantization, kernel differences, or architectural separation between engines.*
