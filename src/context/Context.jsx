import { useState, useEffect } from "react";
import runChat from "../config/gemini";
import { Context } from "./context.js";

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState(() => {
        try {
            const saved = localStorage.getItem("studyBuddyHistory");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    useEffect(() => {
        try {
            localStorage.setItem("studyBuddyHistory", JSON.stringify(prevPrompts));
        } catch (e) {
            console.error("Failed to save history", e);
        }
    }, [prevPrompts]);

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setRecentPrompt("");
        setInput("");
    };

    const clearHistory = () => {
        setPrevPrompts([]);
        try {
            localStorage.removeItem("studyBuddyHistory");
        } catch (e) {
            console.error(e);
        }
    };

    const onSent = async (prompt) => {
        const message = (prompt ?? input).trim();

        if (!message || loading) return;

        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(message);

        if (prompt === undefined) {
            setPrevPrompts(prev => {
                const filtered = prev.filter(p => p !== message);
                return [message, ...filtered].slice(0, 30);
            });
        }

        try {
            const response = await runChat(message);

            if (!response || typeof response !== "string") {
                throw new Error("Gemini returned an empty response.");
            }

            setResultData(response);
            setInput("");
        } catch (error) {
            console.error("Frontend chat error:", error);
            setResultData("⚠️ Sorry, something went wrong. Please check your internet or API key and try again.");
        } finally {
            setLoading(false);
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        clearHistory,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
