
import { useState } from "react";
import runChat from "../config/gemini";
import { Context } from "./context.js";


const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setRecentPrompt("");
        setInput("");
    };

    const onSent = async (prompt) => {
        const message = (prompt ?? input).trim();

        if (!message || loading) return;

        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(message);

        if (prompt === undefined) {
            setPrevPrompts(prev => [...prev, message]);
        }

        try {
            const response = await runChat(message);

            if (!response || typeof response !== "string") {
                throw new Error("Gemini returned an empty response.");
            }

            // Keep original Markdown response unchanged
            setResultData(response);
            setInput("");

        } catch (error) {
            console.error("Frontend chat error:", error);
            setResultData("Sorry, something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
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
