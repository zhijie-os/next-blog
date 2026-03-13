---
title: 'Address off-policy training in VERL'
date: '2025-11-01'
---

VERL(Volcano Engine Reinforcement Learning) is an efficient RL framework for LLMs. It consists of an `inference` engine and a `trainer` engine. The RL loop for LLM is that the `inference` would give rollout, i.e, sequences of LLM outputs. The rollout would be critized and guide the trainer to perform on-policy training. The modern inference engines usually perform optimization to maximize rollout speed. Among the methods of optimizing the inference engines, the quantization is most used and performant. However, the quantization would secretly move the RL framework into off-policy training.
