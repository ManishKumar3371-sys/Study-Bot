# Study Buddy 🎓

A responsive, distraction-free AI learning companion designed for students and developers to study complex topics, practice problem solving, and revise engineering concepts.

---

## 📱 Mobile-First & Genuine Engineering

- **100% Mobile Responsive:** Built with responsive layouts, sliding drawer navigation, touch-friendly tap targets, and no horizontal overflow issues on small screens.
- **Genuine, Handcrafted UI:** Authentic human-crafted software look and feel — clean typography, subtle borders, intuitive light and dark mode, and minimal clutter.
- **Academic Focus:** Tailored for DSA, Operating Systems, Computer Networks, DBMS, and core engineering topics.
- **Copy & Revision Tools:** One-tap answer/code copy, saved chat history, and quick topic launchers.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Modern CSS (Variables, Flexbox, Grid)
- **Icons & Typography:** Lightweight Vector SVGs, Plus Jakarta Sans, JetBrains Mono
- **Markdown Support:** `react-markdown`, `remark-gfm`
- **Backend / Serverless:** Vercel Serverless Function (`api/chat.js`) & Express (`server.mjs`)
- **AI Model:** Google Gemini 3.5 Flash Lite via `@google/genai`

---

## 💻 Local Setup

```bash
# 1. Clone repository
git clone https://github.com/ManishKumar3371-sys/Study-Bot.git
cd Study-Bot

# 2. Install dependencies
npm install

# 3. Add API key in .env
GEMINI_API_KEY=your_gemini_api_key_here

# 4. Start frontend
npm run dev
```
