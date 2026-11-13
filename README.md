# Study Buddy 🎓⚡

**Next-Generation AI Learning Companion for Students, Developers, and Researchers.**

Study Buddy is a modern, high-performance web application designed to simplify complex technical topics, explain algorithms, prepare practice quizzes, and boost self-learning with conversational artificial intelligence powered by **Google Gemini**.

🌐 **Live Deployment:** [https://study-bot-sandy.vercel.app/](https://study-bot-sandy.vercel.app/)  
👨‍💻 **Portfolio:** [https://manish-portfolio-react-ten.vercel.app/](https://manish-portfolio-react-ten.vercel.app/)

---

## ✨ Features

- 🧠 **AI-Powered Learning Assistance:** Powered by Google Gemini 3.5 Flash Lite for fast and reliable answers.
- 🎨 **Genuine Modern SaaS UI:** Clean, polished interface styled with custom gradients, sleek typography (Plus Jakarta Sans & JetBrains Mono), and crisp SVGs.
- 🌓 **Intelligent Theme Toggle:** Seamless Light Mode and Dark Mode (Deep Obsidian & Violet aesthetic) with local storage persistence.
- 💬 **Interactive Chat Thread:** Distinct chat bubbles for user prompts and AI responses with markdown formatting, code highlights, and tables.
- 📋 **One-Click Code & Answer Copy:** Easily copy full code explanations and answers directly to clipboard.
- 💡 **Curated Academic Prompt Cards:** Quick-start suggestions for DSA, System Design, Operating Systems, and Database Normalization.
- 🗂️ **Persisted Chat History:** Recent queries are saved across browser refreshes with clear options.
- 📱 **Fully Responsive Layout:** Optimized for mobile phones, tablets, and wide monitors.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, JavaScript (ESModules)
- **Styling:** Modern CSS (CSS Variables, Responsive Flexbox/Grid, Glassmorphic effects)
- **Typography & Icons:** Plus Jakarta Sans, JetBrains Mono, Custom lightweight SVG Icons
- **Markdown Rendering:** `react-markdown`, `remark-gfm`
- **Backend / Serverless:** Vercel Serverless Functions (`api/chat.js`), Node.js, Express (`server.mjs`)
- **AI Engine:** `@google/genai` (Google Gemini 3.5 Flash Lite)
- **Hosting:** Vercel

---

## 💻 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/ManishKumar3371-sys/Study-Bot.git
cd Study-Bot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start the frontend development server
```bash
npm run dev
```

### 5. (Optional) Run the local backend
```bash
node server.mjs
```

---

## 🚀 Deployment

The project is preconfigured with `vercel.json` for seamless deployment on Vercel. 

Every commit pushed to the `main` branch automatically triggers production redeployment on Vercel.

---

## 👨‍💻 Author

**Manish Kumar**  
Computer Engineering Student & Full-Stack Developer  
- **GitHub:** [https://github.com/ManishKumar3371-sys](https://github.com/ManishKumar3371-sys)  
- **Portfolio:** [https://manish-portfolio-react-ten.vercel.app/](https://manish-portfolio-react-ten.vercel.app/)  
- **Live Demo:** [https://study-bot-sandy.vercel.app/](https://study-bot-sandy.vercel.app/)
