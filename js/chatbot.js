/* ============================================================
   CHATBOT.JS — AI chatbot powered by Anthropic API
   Knows everything about Jero from PORTFOLIO_DATA
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  const fab          = document.getElementById('chatbotFab');
  const panel        = document.getElementById('chatbotPanel');
  const closeBtn     = document.getElementById('chatbotClose');
  const input        = document.getElementById('chatbotInput');
  const sendBtn      = document.getElementById('chatbotSend');
  const messagesEl   = document.getElementById('chatbotMessages');
  const suggestions  = document.querySelectorAll('.chatbot-chip');
  if (!fab || !panel) return;

  let isOpen = false;
  let conversationHistory = [];

  /* ── Open / close ── */
  function togglePanel() {
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    panel.setAttribute('aria-hidden', !isOpen);
    if (isOpen) {
      input.focus();
      fab.setAttribute('aria-label', 'Close AI chatbot');
    } else {
      fab.setAttribute('aria-label', 'Open AI chatbot — ask me anything about Jero');
    }
  }

  fab.addEventListener('click', togglePanel);
  fab.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') togglePanel(); });
  closeBtn.addEventListener('click', togglePanel);

  /* ── Close on outside click ── */
  document.addEventListener('click', function (e) {
    if (isOpen && !panel.contains(e.target) && !fab.contains(e.target)) togglePanel();
  });

  /* ── Suggestion chips ── */
  suggestions.forEach(chip => {
    chip.addEventListener('click', function () {
      sendMessage(this.textContent);
      // Remove suggestions after first use
      const suggestionsEl = document.querySelector('.chatbot-suggestions');
      if (suggestionsEl) suggestionsEl.style.display = 'none';
    });
  });

  /* ── Send ── */
  sendBtn.addEventListener('click', () => sendMessage(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input.value); }
  });

  function addMessage(text, role) {
    const div = document.createElement('div');
    div.className = `chatbot-msg ${role}`;
    div.innerHTML = `<p>${text}</p>`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function addTyping() {
    const div = document.createElement('div');
    div.className = 'chatbot-msg bot typing';
    div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  /* ── Build system prompt from portfolio data ── */
  function buildSystemPrompt() {
    const d = window.PORTFOLIO_DATA;
    if (!d) return 'You are a helpful assistant for Jero Halili\'s portfolio.';

    const projectsList = d.projects.map(p =>
      `- ${p.title}: ${p.description} Tech: ${p.tech.join(', ')}. Outcome: ${p.outcome}`
    ).join('\n');

    const skillsList = d.skills.flatMap(cat =>
      cat.items.map(i => `${i.name} (${i.label})`)
    ).join(', ');

    return `You are an AI assistant embedded in Jero Halili's portfolio website. Your job is to answer questions from potential employers and clients about Jero — his skills, projects, availability, and how to work with him.

ABOUT JERO:
- Full name: Jero Halili
- Location: Angeles, Philippines — open to remote work
- Role: Computer Scientist & Full-Stack Developer with AI automation expertise
- Experience: 2-3 years, currently pursuing BS Computer Science (Dean's List)
- Email: jerobusiness20@gmail.com
- GitHub: github.com/jerohalili
- LinkedIn: linkedin.com/in/jerohalili
- Currently available for freelance contracts and full-time remote roles

SKILLS: ${skillsList}

PROJECTS:
${projectsList}

SPECIALIZATIONS: AI workflow automation, full-stack SaaS development, database architecture, conversion-focused landing pages, growth-driven marketing systems

TARGET OPPORTUNITIES: Remote full-stack roles at US startups, SaaS companies, AI/automation companies. Open to freelance for websites, AI automation, marketing/design projects.

TONE GUIDELINES:
- Be concise, warm, and professional
- Speak confidently about Jero's abilities
- If asked something you don't know, say so honestly and suggest contacting Jero directly
- Keep responses to 2-4 sentences unless a detailed answer is specifically requested
- End with a relevant follow-up question or call to action when appropriate

Do not make up certifications, companies, or metrics not mentioned above.`;
  }

  /* ── Send to Anthropic API ── */
  async function sendMessage(text) {
    text = text.trim();
    if (!text) return;

    input.value = '';
    addMessage(text, 'user');
    conversationHistory.push({ role: 'user', content: text });

    const typingEl = addTyping();

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: buildSystemPrompt(),
          messages: conversationHistory,
        }),
      });

      const data = await response.json();
      typingEl.remove();

      if (data.content && data.content[0]) {
        const reply = data.content[0].text;
        addMessage(reply, 'bot');
        conversationHistory.push({ role: 'assistant', content: reply });

        // Keep history manageable (last 10 turns)
        if (conversationHistory.length > 20) {
          conversationHistory = conversationHistory.slice(-20);
        }
      } else {
        throw new Error('No response');
      }
    } catch (err) {
      typingEl.remove();
      // Graceful fallback — answer from data directly
      const fallback = getFallbackResponse(text);
      addMessage(fallback, 'bot');
      conversationHistory.push({ role: 'assistant', content: fallback });
    }
  }

  /* ── Offline fallback responses ── */
  function getFallbackResponse(text) {
    const lower = text.toLowerCase();
    const d = window.PORTFOLIO_DATA;

    if (/skill|tech|know|stack|language/.test(lower)) {
      return "Jero specializes in full-stack development (MERN), AI automation with LLMs and n8n, database architecture, and marketing tech. He's also strong in UI/UX design and content systems.";
    }
    if (/project|built|work|portfolio/.test(lower)) {
      return "Jero has built an AI-powered marketing automation system, a full MERN-stack school organization platform, and a professional artist portfolio. Each solved a real business problem with measurable impact.";
    }
    if (/available|hire|open|freelance|job|role/.test(lower)) {
      return "Yes! Jero is currently available for remote freelance contracts and full-time roles. Best to reach him at jerobusiness20@gmail.com to discuss your project.";
    }
    if (/location|where|remote|timezone/.test(lower)) {
      return "Jero is based in Angeles, Philippines and is fully open to remote work. He can overlap with US timezones (PST/EST) and is experienced working asynchronously.";
    }
    if (/ai|automation|llm|gpt/.test(lower)) {
      return "AI automation is one of Jero's strongest suits. He's built local LLM pipelines with LLaMA, automated content workflows with n8n, and integrated LLM APIs into production systems.";
    }
    if (/contact|email|reach|talk/.test(lower)) {
      return "You can reach Jero at jerobusiness20@gmail.com or connect on LinkedIn at linkedin.com/in/jerohalili. He typically responds within 24 hours.";
    }
    return "Great question! For the most accurate answer, I'd recommend reaching out to Jero directly at jerobusiness20@gmail.com — he's responsive and happy to chat about any project or opportunity.";
  }
});
