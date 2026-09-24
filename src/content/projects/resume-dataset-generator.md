---
title: "CS + Engineering Resume Dataset Generator"
subtitle: "Automated Dataset Engineering"
description: "An n8n workflow that generates demographically diverse, photorealistic synthetic resume datasets — LLM-written content, ComfyUI headshots, Reactive Resume PDFs, Drive delivery."
tags: ["n8n", "AnythingLLM", "ComfyUI", "Reactive Resume"]
image: "/images/projects/resume-generator.png"
impact: "100% Automated Dataset Creation"
order: 4
repoUrl: "https://github.com/jerohalili/resume-ai-generator-automation"
---

**Repo:** https://github.com/jerohalili/resume-ai-generator-automation
*Self-hosted pipeline — no public demo; runs via Docker (n8n + AnythingLLM + ComfyUI).*

## The Challenge

HR-tech needs large, diverse resume datasets to train ATS parsers and NER models — but real resumes carry GDPR/NPC privacy risk, and hand-writing thousands of consistent profiles is impossible.

## The Solution

I built a "set and forget" n8n workflow that generates **2 candidate profiles per run** end-to-end: randomized diverse personas → two LLM passes for resume JSON → ComfyUI headshot → Reactive Resume create/patch/PDF → Google Drive upload (JSON + PDF + headshot). A GitHub Actions schedule can trigger dataset builds automatically.

---

## Technical Highlights

### Procedural Persona Engine
* **Diversity by design:** Weighted ethnic pools with culturally matched names plus ComfyUI prompt descriptors; random M/F assignment; specialties across CS (ML/AI, Backend, Frontend, DevOps, Security, Mobile) and Engineering (Mechanical, Civil, Electrical, Chemical, Aerospace, Biomedical).
* **Consistency:** Career progression, skill clusters, and visual identity stay aligned per persona.

### Full Pipeline Nodes
`Define Profiles → LLM Call 1 (basics/experience/education) → LLM Call 2 (skills/projects/certs) → Assemble → ComfyUI headshot (150s wait) → Drive upload → Reactive Resume create + patch → 15s printer wait → PDF export → Drive upload (PDF + JSON)`.

### Scheduled + Credentialed
* **GitHub Actions** (`.github/workflows/generate_dataset.yml`) fires n8n via REST API — needs `N8N_BASE_URL`, `N8N_API_KEY`, `N8N_WORKFLOW_ID` secrets; expose local n8n via Cloudflare Tunnel for remote triggers.
* **n8n credentials:** Reactive Resume (`x-api-key` header), AnythingLLM (`Bearer` header), Google Drive (OAuth2 client ID/secret).

---

## System Architecture

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Orchestration** | **n8n** | Imports `workflow/CS+Engineering Resume Dataset Generator v4.json`. |
| **Text Generation** | **AnythingLLM (Llama 3.1 GGUF)** | Two-pass resume JSON via chat API. |
| **Image Synthesis** | **ComfyUI (Stable Diffusion)** | Photorealistic headshots per persona. |
| **Document Engine** | **Reactive Resume v5 API** | Resume create, patch, and PDF export. |
| **Storage** | **Google Drive API** | JSON + PDF + headshot per candidate. |

---

## Impact & Key Takeaways

Turns a week of data entry into a background job: 10 or 1,000 resumes cost the same effort, with zero PII risk and dual outputs (JSON for model training, PDF for parser/OCR testing). Lesson: API-first document engines turn any structured data into polished artifacts.

---

## Roadmap

* **Short-Term:** Multi-language generation (Tagalog/English/Spanish).
* **Long-Term:** LinkedIn-profile generator for holistic synthetic footprints.

---

## How to Run This Project

```bash
git clone https://github.com/jerohalili/resume-ai-generator-automation.git
cd resume-ai-generator-automation
chmod +x scripts/setup.sh
./scripts/setup.sh
# fill .env (ANYTHINGLLM_API_KEY, ANYTHINGLLM_WORKSPACE,
# COMFYUI_MODEL, REACTIVE_RESUME_API_KEY,
# GDRIVE_CLIENT_ID/SECRET, GDRIVE_FOLDER_ID)
./scripts/setup.sh
chmod +x scripts/import_workflow.sh
./scripts/import_workflow.sh
# open http://localhost:5678, configure credentials, hit Execute Workflow
```

Prerequisites: Docker + Compose v2, NVIDIA GPU recommended, Reactive Resume account + API key, Google Cloud project with Drive API enabled, GGUF model in AnythingLLM, SD checkpoint in ComfyUI.
