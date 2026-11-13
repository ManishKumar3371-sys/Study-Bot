import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { Context } from "../../context/context.js";
import {
  MenuIcon,
  PlusIcon,
  MessageSquareIcon,
  TrashIcon,
  HelpCircleIcon,
  ActivityIcon,
  SparklesIcon,
} from "../Icons/Icons.jsx";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat, clearHistory } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <>
      <aside className={`sidebar ${extended ? "extended" : "collapsed"}`}>
        <div className="top">
          <button
            className="menu-btn"
            onClick={() => setExtended((prev) => !prev)}
            aria-label="Toggle Navigation Sidebar"
            title="Toggle Menu"
          >
            <MenuIcon size={20} />
          </button>

          <button
            onClick={() => newChat()}
            className="new-chat-btn"
            title="Start New Chat"
          >
            <PlusIcon size={18} />
            {extended && <span>New Chat</span>}
          </button>

          {extended && (
            <div className="recent-section">
              <div className="recent-header">
                <span className="recent-title">Recent Chats</span>
                {prevPrompts.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="clear-history-btn"
                    title="Clear history"
                  >
                    <TrashIcon size={14} />
                  </button>
                )}
              </div>

              <div className="recent-list">
                {prevPrompts.length === 0 ? (
                  <p className="empty-history">No recent queries yet</p>
                ) : (
                  prevPrompts.map((item, idx) => (
                    <div
                      onClick={() => loadPrompt(item)}
                      className="recent-entry"
                      key={`${item}-${idx}`}
                      title={item}
                    >
                      <MessageSquareIcon size={16} className="entry-icon" />
                      <span className="recent-text">{item}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bottom">
          <button
            className="bottom-item"
            onClick={() => setShowHelpModal(true)}
            title="Help & Shortcuts"
          >
            <HelpCircleIcon size={19} />
            {extended && <span>Help & Shortcuts</span>}
          </button>

          <a
            href="https://study-bot-sandy.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="bottom-item"
            title="System Status"
          >
            <ActivityIcon size={19} />
            {extended && (
              <span className="status-badge-wrap">
                System Active <span className="status-dot"></span>
              </span>
            )}
          </a>
        </div>
      </aside>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="modal-backdrop" onClick={() => setShowHelpModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-brand">
                <div className="brand-badge">
                  <SparklesIcon size={18} />
                </div>
                <h3>Study Buddy Help & Info</h3>
              </div>
              <button
                className="close-modal"
                onClick={() => setShowHelpModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-desc">
                Study Buddy is an AI-powered academic assistant engineered to simplify complex subjects, draft quizzes, explain code algorithms, and enhance self-learning.
              </p>
              <div className="shortcut-group">
                <h4>Quick Tips</h4>
                <ul>
                  <li><strong>Enter:</strong> Send message</li>
                  <li><strong>Shift + Enter:</strong> Add new line in prompt</li>
                  <li><strong>Prompt Cards:</strong> Click any preset idea on home screen to get instant study answers.</li>
                  <li><strong>Copy Code/Answer:</strong> Use the copy button in top right of AI response.</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-primary"
                onClick={() => setShowHelpModal(false)}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
