---
title: 'Enabling MXFP8 Inference on Ascend NPUs for VERL'
date: '2026-03-27'
lastModified: '2026-05-26'
tags: ['verl', 'vllm', 'ascend', 'quantization', 'mxfp8', 'rl', 'npu']
description: 'How I brought MXFP8 quantization to VERL rollout on Huawei Ascend 950 devices — two PRs, a weight reloading puzzle, and a lot of tensor shape debugging.'
---

At Huawei, I work on making RL training for LLMs run faster on Ascend NPUs. One of the most impactful things you can do is speed up inference during rollouts — the inference engine generates sequences, the trainer consumes them, and inference is usually the bottleneck by a wide margin.

The Ascend 950 (DV100 and DV120) supports MXFP8, an aggressive 8-bit floating-point quantization format. It cuts memory usage and speeds up matrix multiplications significantly. The problem was that nobody had wired it up for RL training in VERL. The quantization method existed in vllm-ascend for standard inference, but RL training breaks a fundamental assumption: weights stay put after loading.

## The weight reloading problem

In regular inference, you load the model once and run. In RL training, the training engine updates the weights every step, and the inference engine needs to reload them. If you have a quantization method that transforms the weight tensors into a hardware-specific layout — and MXFP8 on Ascend does — every reload becomes a potential crash.

The Ascend NPU expects MXFP8 weights in a transposed layout. For a dense linear layer, the weight goes from `(output_size, input_size)` to `(input_size, output_size)`, and the scale gets reshaped from `(n_dim, k_dim)` to `(k_dim//2, n_dim, 2)`. For MoE layers it's even more involved, with four separate tensors per expert group all needing their own transforms.

After the initial load, `process_weights_after_loading()` applies these transforms. But when the trainer sends updated weights a few hundred steps later, the weight loader looks at the tensors and sees shapes it doesn't recognize. Crash.

The fix sounds obvious in retrospect: restore the original shapes before reloading, then reapply the transforms after. But implementing it cleanly means the quantization method needs to:
- Remember the original shapes from the very first load
- Know whether it's currently in "transformed" or "restored" state
- Handle being called multiple times across potentially hundreds of reload cycles
- Not interfere with the worker thread's own wake-up logic

## The vllm-ascend PR

I added two methods to the MXFP8 quantization class:

`restore_weights_for_rl_loading()` reverses the NPU layout transforms — transposes the weights back, reshapes the scales — and returns tensors to the format the HuggingFace weight loader expects. It guards against being called when not needed with a `_mxfp8_transformed` flag.

`process_weights_after_loading()` applies the NPU transforms and stores the original shapes on first call. On subsequent calls (after reload), it uses the stored shapes. This is important because without the stored shapes, you'd need the weight loader to tell you what the original layout was, and it doesn't.

Both the dense and MoE paths needed the same treatment. The dense case is two tensors; the MoE case is four tensors per expert group. Adding a helper `_restore()` kept the MoE code from becoming unreadable.

There was also a subtle bug in the worker's wake-up logic: it was unconditionally reshaping weights on wake, even for quantized models where the reshape was already handled. One line change in `worker.py` fixed that.

The PR merged at [vllm-project/vllm-ascend#7631](https://github.com/vllm-project/vllm-ascend/pull/7631) — about 100 lines of new code in one file, plus the worker fix.

## The VERL integration

The other half was making VERL actually use it. I added a `quantization="ascend"` option to VERL's rollout configuration. When set, VERL passes it to the vllm-ascend backend, which activates MXFP8. The change itself was small — most of the infrastructure for pluggable quantization already existed in VERL, it just needed the Ascend path wired in.

While I was in there, I also fixed an unrelated bug where `ApplyRotaryEmb` wasn't being correctly dispatched on NPUs ([#5754](https://github.com/verl-project/verl/issues/5754)). The NPU patch for rotary embeddings was silently falling through to the wrong implementation.

That PR merged at [verl-project/verl#5756](https://github.com/verl-project/verl/pull/5756) — 171 additions across 3 files.

## Usage

After both PRs, enabling MXFP8 on Ascend is one flag:
```
actor_rollout_ref.rollout.quantization="ascend"
```

## The bigger picture

These PRs are infrastructure. They make rollouts faster, but they also create the training-inference discrepancy that [my ACRL work](/posts/verl-problem) addresses. The quantization that accelerates inference is the same quantization that causes the policy mismatch — more speed, but the training sees a different distribution than what the inference engine produced. I was working on both sides of this problem simultaneously: making low-precision inference work reliably, and making RL training stable under it.

## One last thing

The team at Huawei plans to extend this work to other quantization formats — HiF4 is next on the roadmap, which will push precision even lower while maintaining accuracy. Unfortunately I won't be there to do it myself; I'm leaving the company to start my MSc at the University of Alberta. But the PRs I landed establish the pattern: the weight lifecycle management, the state tracking, the integration points in VERL's config layer. Anyone picking up HiF4 integration on Ascend will find a clear path to follow.
