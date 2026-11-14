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
  UserIcon,
  BotIcon,
  MenuIcon
} from "../Icons/Icons.jsx";

const SUGGESTIONS = [
  {
    title: "Data Structures & Algorithms",
    desc: "Explain Dijkstra's Algorithm with step-by-step logic, complexity, and clean code",
    prompt: "Explain Dijkstra's algorithm step-by-step with real intuition, time complexity, and clean C++ implementation.",
    icon: CodeIcon,
  },
  {
    title: "System Design & Networking",
    desc: "What happens behind the scenes when you enter a URL in a browser?",
    prompt: "How does DNS resolution, TCP handshake, and HTTP/HTTPS caching work step-by-step when typing a URL in the browser?",
    icon: CompassIcon,
  },
  {
    title: "Operating Systems",
    desc: "Generate an interactive 5-question multiple choice quiz on Deadlocks & Process Scheduling",
    prompt: "Generate an interactive 5-question multiple choice quiz on Operating Systems & Deadlock conditions with clear answers and explanations.",
    icon: BookOpenIcon,
  },
  {
    title: "Database Management",
    desc: "Explain Database Normalization (1NF to BCNF) simply with schema examples",
    prompt: "Explain Database Normalization (1NF, 2NF, 3NF, BCNF) with clear tables, anomalies, and realistic examples.",
    icon: LightbulbIcon,
  },
];

const Main = ({ darkMode, setDarkMode, setSidebarOpen }) => {
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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
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
        <div className="nav-left">
          <button 
            type="button" 
            className="mobile-menu-trigger"
            onClick={() => setSidebarOpen(prev => !prev)}
            aria-label="Open sidebar menu"
          >
            <MenuIcon size={20} />
          </button>
          
          <div className="nav-brand">
            <div className="brand-icon-wrapper">
              <SparklesIcon size={19} />
            </div>
            <div className="brand-text">
              <span className="brand-name">Study Buddy</span>
              <span className="brand-badge-ai">AI</span>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            type="button"
            aria-label="Toggle dark mode"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>

          <div
            className="nav-avatar"
            title="User"
            aria-hidden="true"
          >
            <UserIcon size={18} />
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="main-container">
        {!showResult ? (
          <div className="welcome-section">
            <div className="greet">
              <div className="welcome-badge">
                <SparklesIcon size={15} />
                <span>Smart Academic Assistant</span>
              </div>
              <h1>
                What would you like to <span className="gradient-text">learn today?</span>
              </h1>
              <p className="greet-sub">
                Ask any question from computer science, engineering, or core subjects. Get structured breakdowns, code samples, and exam revision instantly.
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
                        <IconComponent size={17} />
                      </div>
                      <span className="card-category">{item.title}</span>
                    </div>
                    <p className="card-desc">{item.desc}</p>
                    <span className="card-action">Ask this topic →</span>
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
                <UserIcon size={17} />
              </div>
              <div className="bubble user-bubble">
                <p>{recentPrompt}</p>
              </div>
            </div>

            {/* AI Response Bubble */}
            <div className="message-wrapper bot-msg">
              <div className="avatar bot-avatar">
                <BotIcon size={18} />
              </div>
              <div className="bubble bot-bubble">
                <div className="bot-header">
                  <div className="model-badge">
                    <SparklesIcon size={14} />
                    <span>Study Buddy</span>
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
                          <CheckIcon size={13} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon size={13} />
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
              <SendIcon size={17} />
            </button>
          </div>
          <div className="footer-bar">
            <span>Powered by Gemini • Study Buddy can make mistakes, always verify critical information.</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
