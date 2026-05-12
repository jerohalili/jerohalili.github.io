---
id: "04"
title: "Synthetic Resume Data Factory"
subtitle: "Automated Dataset Engineering"
description: "An end-to-end n8n automation pipeline that generates high-fidelity synthetic resumes using Llama 3.1 and Z Image Turbo."
tags: ["n8n", "Llama 3.1", "Data Science", "Automation"]
image: "/images/projects/resume-generator.png"
impact: "100% Automated Dataset Creation"
isFlagship: false
order: 4
---

## The Core Concept

The **Automated Resume Data Factory** addresses a critical bottleneck in Machine Learning: the scarcity of high-quality, structured personal data for training HR-tech models. Privacy laws (GDPR/NPC) make using real resumes risky for development; this system solves that by generating **synthetic yet realistic** professional profiles at scale.

By orchestrating LLMs for persona generation and lightning-fast image models for headshots, I built a system that transforms a simple prompt into a fully formatted, "hirable" professional identity—exported as both machine-readable JSON and human-readable PDF.

---

## The Engineering Challenge

### The Data Scarcity Problem
Developers building ATS (Applicant Tracking Systems) or career recommendation engines often struggle to find diverse datasets. Manually creating thousands of unique resumes with consistent work histories, skills, and contact info is practically impossible.

### The Solution: Procedural Persona Generation
I engineered a multi-stage workflow that ensures every generated resume is internally consistent. If the AI decides a persona is a "Senior DevOps Engineer," the system automatically aligns their:
1. **Work History:** Logic-gated career progression (Junior > Mid > Senior).
2. **Skill Clusters:** Tech stacks that actually make sense together (e.g., Kubernetes + Terraform).
3. **Visual Identity:** Generating a professional headshot that matches the persona’s age and vibe.

---

## Technical Architecture

The workflow is managed via n8n, connecting local inference engines with cloud storage for a seamless "set and forget" experience.

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Orchestration** | **n8n** | Manages the logic flow and conditional branching. |
| **Text Generation** | **Llama 3.1** | Generates professional summaries and work experiences. |
| **Image Synthesis** | **Z Image Turbo** | Produces high-speed, hyper-realistic professional portraits. |
| **Document Engine** | **Reactive Resume** | Renders structured data into polished, modern PDF layouts. |
| **Storage** | **Google Drive API** | Automatically categorizes and stores PDF/JSON exports. |

---

## Key Features

### 1. High-Fidelity Synthetic Personas
Unlike simple "lorem ipsum" generators, this pipeline uses Llama 3.1 to craft nuanced professional narratives. It simulates realistic career gaps, diverse educational backgrounds, and industry-specific jargon, making the data indistinguishable from real-world resumes for testing purposes.

### 2. Turbo-Charged Visuals
By integrating **Z Image Turbo**, the system generates professional headshots in milliseconds. This ensures that every resume in the dataset has a unique visual identity without slowing down the entire automation chain.

### 3. Structured Data Export (JSON + PDF)
The system doesn't just "print" a resume. It simultaneously generates:
* **JSON Files:** Perfect for training NER (Named Entity Recognition) models.
* **PDF Files:** Ideal for testing PDF parsers and OCR (Optical Character Recognition) tools.

---

## The Impact

This automation transforms a week-long data entry task into a 5-minute background process:
* **Massive Scalability:** Generate 10 or 1,000 resumes with the same amount of effort.
* **Privacy Compliance:** 100% synthetic data means zero risk of PII (Personally Identifiable Information) leaks.
* **Format Versatility:** Ready-to-use data for both data scientists and front-end developers.

---

## Lessons Learned & Future Roadmap

Developing this project highlighted the power of **API-first design**. By connecting Reactive Resume’s templating engine with n8n’s logic, I realized that any structured data can be turned into a professional-grade document with zero manual intervention.

### What's next?
* **Short-Term:** Adding support for multi-language resume generation (Tagalog/English/Spanish).
* **Long-Term:** Integrating an automated "LinkedIn Profile" generator to create holistic online footprints for synthetic personas.

---

## How to Run This Project

Ready to generate your own dataset?

1. **Prerequisites:**
   * An active **n8n** instance (Docker recommended).
   * API access to **Llama 3.1** and **Z Image Turbo**.
   * A **Reactive Resume** server instance.
2. **Clone the Repo:**
   ```bash
   git clone [https://github.com/jerohalili/resume-ai-generator-automation.git](https://github.com/jerohalili/resume-ai-generator-automation.git)
3. **Run ComfyUI:** Link the Custom Model Workflows API to n8n
4. **Run AnythingLLM:** Link the Custom Model LLM API to n8n
5. **Ready n8n:** Import then link the n8n Workflow to Telegram
5. **Run n8n:** Customize the n8n Workflow with prompts and parameters
6. **Use Telegram:** Publish the n8n Workflow and use online in Telegram