---
title: 'Why I pre-ordered a Framework Laptop 13 Pro'
date: '2026-05-26'
tags: ['hardware', 'framework', 'laptop', 'gpu']
description: 'Leaving Huawei, losing access to H200s, and the long search for a laptop I would never have to replace.'
---

I left Huawei recently. That means losing access to the compute cluster I used daily — B200s, H200s, the kind of machines where you don't think twice before launching a multi-GPU training run. Suddenly I needed CUDA at home.

## The GPU problem

I've been down the desktop road before. Built one, maintained it, then moved cities and had to figure out whether to ship it, sell it, or leave it with family. I move too often to want a desktop, and I don't have the energy to maintain multiple devices. A gaming laptop would solve CUDA but they're heavy, loud, and feel like compromises everywhere except the GPU.

I tried the eGPU route. Drilled a hole in the back of a ThinkPad to attach an OCULINK-to-PCIe adapter through the NVMe 2280 slot. It was unreliable — the ThinkPad's BIOS has no debugging options, no advanced settings, and sometimes it simply refused to pick up the OCULINK signal. I looked at the ThinkBook 14 with its native TGX port that doubles as OCULINK, but the machine itself feels cheap in daily use.

For now, I'm renting cloud GPUs through RunPod and Vast.ai on my MacBook. It works. The MacBook has the build quality I want, but it will never have CUDA.

## What I actually want

A laptop that:
- Has premium build quality (CNC aluminum, good keyboard, good screen)
- Gets real battery life (not "gaming laptop" battery life)
- Has CUDA access somehow, even if external
- Doesn't need to be replaced every three years

The last point is the one that matters most. I've watched every laptop I've owned become e-waste on a predictable schedule — battery degrades, soldered RAM can't be upgraded, the motherboard is obsolete by the next generation. Sell it at a loss, buy a new one, repeat. It's wasteful and annoying.

## Framework Laptop 13 Pro

Framework announced the 13 Pro recently and I pre-ordered one. Batch 12, ships in September. The wait is going to be brutal.

Here's what sold me:

**The hardware itself.** Panther Lake, LPCAMM RAM (socketed, replaceable), a 20-hour battery, a touchscreen, and a CNC-machined aluminum chassis. All in a 13-inch form factor that doesn't feel like a compromise.

**The upgrade model.** This is the real thing. Framework sells replacement motherboards for each generation. When the next CPU generation comes out, you swap the mainboard — not the whole laptop. The chassis, screen, keyboard, battery, and ports all stay. You buy a $400-600 board instead of a $2,000 laptop. Over a decade, that's thousands saved and a lot less e-waste.

**No OCULINK, but I'll wait.** The Framework 16 has an OCULINK port, but it's too heavy for my taste — I ruled it out on weight alone. The 13 Pro doesn't have OCULINK, but Thunderbolt 5 is coming with 120Gbps bandwidth. That's enough for a respectable external GPU enclosure. I can wait. The MacBook and cloud GPUs cover me until then.

## The bet

If Framework delivers what they promise, this is the last laptop I ever buy. Not in the sense that it will last forever — components wear out — but in the sense that I'll never again buy a whole new laptop because one part became obsolete. Replace the mainboard, replace the battery, keep the rest. It's a fundamentally different relationship with a device.

I'm writing this before I've received mine, before I know if the build quality holds up, if the battery life is real, if the upgrade model actually works as advertised. But I'm willing to bet on it because the alternative — buying and discarding laptops on a three-year cycle — is a model I'm tired of participating in.

I'll write a follow-up when it arrives.
