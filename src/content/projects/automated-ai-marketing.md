---
title: "Automated AI Marketing System"
subtitle: "Local AI Content Engine"
description: "A fully automated marketing pipeline that generates posts using a local LLM, creates images, schedules and publishes to social media."
tags: ["AI Automation", "LLM", "n8n", "ComfyUI"]
image: "/images/ai-marketing-hero.jpg"
impact: "01"
buttonText: "View Architecture"
---

### The Challenge
Marketing teams often face a "content treadmill"—the need to post daily across multiple platforms. Cloud-based AI tools (like OpenAI or Midjourney) offer great results but come with **high subscription costs** and **data privacy concerns**. I needed a system that was free to run, private, and fully autonomous.

### The Architecture
The system operates on a "Local-First" philosophy:
* **Intelligence:** Meta-Llama-3.1-8B running on **LM Studio**.
* **Orchestration:** **n8n** self-hosted via Docker.
* **Visuals:** **ComfyUI** for Stable Diffusion image generation.
* **Tunneling:** **Ngrok** to allow social media webhooks to talk to my local machine safely.

### The Solution
I built a multi-stage n8n workflow. It starts with a cron trigger every morning that:
1.  Scrapes trending topics in the tech industry.
2.  Sends a prompt to **Llama 3.1** to write a 3nd-person educational post.
3.  Triggers a **Stable Diffusion** prompt to generate a matching 4K image.
4.  Automatically formats and pushes the content to the LinkedIn and Instagram APIs.

### Results
* **Cost:** $0/month in API fees (after hardware).
* **Efficiency:** 100% autonomous; content is ready before I wake up.
* **Privacy:** No training data ever leaves the local network.