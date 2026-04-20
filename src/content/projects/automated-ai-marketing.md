---
id: "01"
title: "Autonomous AI Marketing Engine"
subtitle: "Local LLM Automation"
description: "A private, zero-cost content pipeline leveraging local Llama 3.1 and Stable Diffusion to automate multi-channel marketing."
tags: ["AI Automation", "Local LLMs", "n8n", "Docker"]
image: "/images/projects/ai-marketing.jpg"
impact: "Efficiency"
isFlagship: true
order: 1
---

### The Challenge
Marketing teams often face a "content treadmill"—the constant need for fresh, high-quality posts. Existing SaaS solutions are expensive and often compromise data privacy by sending internal strategy to third-party cloud APIs.

### The Solution
I engineered a **local-first automation stack** that handles everything from trend research to asset generation. By using **n8n** as the orchestrator and **LM Studio** for local inference, the system generates brand-aligned copy and visuals without a single cent in API fees.

### Key Architecture
- **Orchestration:** n8n running via Docker on a local server.
- **Inference:** Meta-Llama-3.1-8B (Quantized) for high-speed copywriting.
- **Visuals:** ComfyUI with SDXL for generating contextually relevant post images.
- **Deployment:** Automated triggers for LinkedIn and Instagram via webhooks.

### The Impact
The system reduced content creation time by **90%**, allowing for a consistent daily posting schedule while maintaining 100% data sovereignty.