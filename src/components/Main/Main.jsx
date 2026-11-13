import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Main.css";
import { Context } from "../../context/context.js";
import {
  SparklesIcon,
  SunIcon,
  MoonIcon,
  CopyIcon,
  CheckIcon,
  SendIcon,
  CompassIcon,
  LightbulbIcon,
  CodeIcon,
  BookOpenIcon,
  ExternalLinkIcon,
  UserIcon,
  BotIcon
} from "../Icons/Icons.jsx";

const SUGGESTIONS = [
  {
    title: "DSA & Problem Solving",
    desc: "Explain Dijkstra's Algorithm with step-by-step example and C++ code",
    prompt: "Explain Dijkstra's algorithm step-by-step with real intuition, time complexity, and clean C++ implementation.",
    icon: CodeIcon,
  },
  {
    title: "System Design & Concepts",
    desc: "How does DNS resolution and Web Caching work under the hood?",
    prompt: "How does DNS resolution and web caching work step-by-step when typing a URL in the browser?",
    icon: CompassIcon,
  },
  {
    title: "Exam Preparation & Quiz",
    desc: "Generate a 5-question interactive quiz on Operating Systems & Deadlocks",
    prompt: "Generate an interactive 5-question multiple choice quiz on Operating Systems & Deadlock conditions with detailed answers.",
    icon: BookOpenIcon,
  },
  {
    title: "Core Subject Summaries",
    desc: "Explain Database Normalization (1NF, 2NF, 3NF, BCNF) simply",
    prompt: "Explain Database Normalization (1NF, 2NF, 3NF, BCNF) with clear tables, anomalies, and realistic examples.",
    icon: LightbulbIcon,
  },
];

const Main = ({ darkMode, setDarkMode }) => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } =
    useContext(Context);
  const resultRef = useRef(null);
  const textareaRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [resultData, loading]);

  const handleInputResize = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  const copyResponse = async () => {
    try {
      await navigator.clipboard.writeText(resultData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !loading) {
        onSent();
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }
    }
  };

  const handleSend = () => {
    if (input.trim() && !loading) {
      onSent();
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <main className="main">
      {/* Top Navbar */}
      <nav className="nav">
        <div className="nav-brand">
          <div className="brand-icon-wrapper">
            <SparklesIcon size={20} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Study Buddy</span>
            <span className="brand-badge-ai">AI 3.5</span>
          </div>
        </div>

        <div className="nav-actions">
          <a
            href="https://manish-portfolio-react-ten.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="portfolio-pill"
            title="Portfolio of Manish Kumar"
          >
            <span>Portfolio</span>
            <ExternalLinkIcon size={13} />
          </a>

          <button
            className="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            type="button"
            aria-label="Toggle dark mode"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          <a
            href="https://github.com/ManishKumar3371-sys/Study-Bot"
            target="_blank"
            rel="noreferrer"
            className="nav-avatar"
            title="Developed by Manish Kumar"
          >
            <UserIcon size={18} />
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <div className="main-container">
        {!showResult ? (
          <div className="welcome-section">
            <div className="greet">
              <div className="welcome-badge">
                <SparklesIcon size={16} />
                <span>Next-Gen Study Companion</span>
              </div>
              <h1>
                Empower your learning with <span className="gradient-text">Study Buddy</span>
              </h1>
              <p className="greet-sub">
                Ask deep technical questions, synthesize core concepts, prepare for exams, or review code algorithms instantly.
              </p>
            </div>

            <div className="suggestions-grid">
              {SUGGESTIONS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="suggestion-card"
                    onClick={() => {
                      setInput(item.prompt);
                      onSent(item.prompt);
                    }}
                  >
                    <div className="card-top">
                      <div className="card-icon-pill">
                        <IconComponent size={18} />
                      </div>
                      <span className="card-category">{item.title}</span>
                    </div>
                    <p className="card-desc">{item.desc}</p>
                    <span className="card-action">Ask this prompt →</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="chat-thread" ref={resultRef}>
            {/* User Message Bubble */}
            <div className="message-wrapper user-msg">
              <div className="avatar user-avatar">
                <UserIcon size={18} />
              </div>
              <div className="bubble user-bubble">
                <p>{recentPrompt}</p>
              </div>
            </div>

            {/* AI Response Bubble */}
            <div className="message-wrapper bot-msg">
              <div className="avatar bot-avatar">
                <BotIcon size={20} />
              </div>
              <div className="bubble bot-bubble">
                <div className="bot-header">
                  <div className="model-badge">
                    <SparklesIcon size={14} />
                    <span>Study Buddy AI</span>
                  </div>
                  {!loading && resultData && (
                    <button
                      onClick={copyResponse}
                      type="button"
                      className="copy-btn"
                      title="Copy response"
                    >
                      {copied ? (
                        <>
                          <CheckIcon size={14} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="thinking-box">
                    <div className="pulsing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <p className="thinking-text">Formulating comprehensive study response...</p>
                  </div>
                ) : (
                  <div className="response-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {resultData}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Input Bar Area */}
        <div className="input-wrapper-container">
          <div className="prompt-box">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={handleInputResize}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything (e.g. explain TCP 3-way handshake, solve a coding question)..."
            />
            <button
              type="button"
              className="send-button"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              title="Send Prompt (Enter)"
              aria-label="Send message"
            >
              <SendIcon size={18} />
            </button>
          </div>
          <div className="footer-bar">
            <span>Powered by Google Gemini 3.5 Flash Lite • Double check crucial facts.</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
