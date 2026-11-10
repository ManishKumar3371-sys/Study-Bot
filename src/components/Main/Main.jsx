import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Main.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/context.js";

const Main = ({ darkMode, setDarkMode }) => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const resultRef = useRef(null);
    const [rows, setRows] = useState(1);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const updateRows = () => setRows(window.innerWidth <= 600 ? 2 : 1);
        updateRows();
        window.addEventListener("resize", updateRows);
        return () => window.removeEventListener("resize", updateRows);
    }, []);

    useEffect(() => {
        if (resultRef.current) resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }, [resultData, loading]);

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
            onSent();
        }
    };

    return (
        <main className="main">
            <nav className="nav">
    <p>Study Buddy</p>
    <div className="nav-actions">
        <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            type="button"
        >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <img src={assets.user_icon} alt="User" />
    </div>
</nav>

            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hey, Buddy</span></p>
                            <p>What do you want to learn today?</p>
                        </div>

                        <div className="cards">
                            <div className="card" onClick={() => setInput("Tell me the major rivers and their importance in Uttar Pradesh")}>
                                <p>Tell me the major rivers and their importance in Uttar Pradesh</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => setInput("Briefly summarize this concept: urban planning")}>
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => setInput("Create a quiz for Data Structures and Algorithms")}>
                                <p>Create a quiz for Data Structures and Algorithms</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => setInput("Explain React JS and React Native with examples")}>
                                <p>Explain React JS and React Native with examples</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result" ref={resultRef}>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User" />
                            <p>{recentPrompt}</p>
                        </div>

                        <div className="result-data">
                            <img className="result-data-icon" src={assets.Gemini_icon} alt="AI" />
                            <div className="response-content">
                                {loading ? (
                                    <div className="loader"><hr /><hr /><hr /></div>
                                ) : (
                                    <>
                                        <div className="response-actions">
                                            <button onClick={copyResponse} type="button">
                                                {copied ? "Copied!" : "Copy answer"}
                                            </button>
                                        </div>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {resultData}
                                        </ReactMarkdown>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <textarea
                            rows={rows}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            value={input}
                            placeholder="Ask Study Buddy anything..."
                        />
                        <div className="icon-container">
                            <button type="button" title="Gallery">
                                <img src={assets.gallery_icon} alt="Gallery" />
                            </button>
                            <button type="button" title="Microphone">
                                <img src={assets.mic_icon} alt="Microphone" />
                            </button>
                            <button
                                type="button"
                                title="Send message"
                                onClick={() => onSent()}
                                disabled={!input.trim() || loading}
                            >
                                <img src={assets.send_icon} alt="Send" />
                            </button>
                        </div>
                    </div>
                    <p className="bottom-info">
                        Study Buddy may display inaccurate information. Please double-check important answers.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Main;
