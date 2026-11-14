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

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [extended, setExtended] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat, clearHistory } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    if (window.innerWidth <= 768 && setSidebarOpen) {
      setSidebarOpen(false);
    }
    await onSent(prompt);
  };

  const handleNewChat = () => {
    newChat();
    if (window.innerWidth <= 768 && setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const isDrawerOpen = sidebarOpen || extended;

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${extended ? "extended" : "collapsed"} ${sidebarOpen ? "mobile-open" : ""}`}>
        <div className="top">
          <div className="sidebar-top-bar">
            <button
              className="menu-btn"
              onClick={() => {
                if (window.innerWidth <= 768) {
                  setSidebarOpen(!sidebarOpen);
                } else {
                  setExtended((prev) => !prev);
                }
              }}
              aria-label="Toggle navigation drawer"
              title="Toggle Menu"
            >
              <MenuIcon size={20} />
            </button>
            {sidebarOpen && (
              <span className="mobile-drawer-label">Menu</span>
            )}
          </div>

          <button
            onClick={handleNewChat}
            className="new-chat-btn"
            title="Start New Chat"
          >
            <PlusIcon size={18} />
            {(isDrawerOpen) && <span>New Chat</span>}
          </button>

          {(isDrawerOpen) && (
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
            onClick={() => {
              setShowHelpModal(true);
              if (window.innerWidth <= 768) setSidebarOpen(false);
            }}
            title="Help & Shortcuts"
          >
            <HelpCircleIcon size={19} />
            {(isDrawerOpen) && <span>Help & Shortcuts</span>}
          </button>

          <div
            className="bottom-item"
            title="System Status"
          >
            <ActivityIcon size={19} />
            {(isDrawerOpen) && (
              <span className="status-badge-wrap">
                System Active <span className="status-dot"></span>
              </span>
            )}
          </div>
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
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-desc">
                Study Buddy is a focused, distraction-free study tool designed for students and developers. Works smoothly on both phone and desktop screens without breaking or overflowing.
              </p>
              <div className="shortcut-group">
                <h4>Quick Tips</h4>
                <ul>
                  <li><strong>Enter:</strong> Send question (on desktop)</li>
                  <li><strong>Send Button:</strong> Tap on mobile to ask</li>
                  <li><strong>Tap Cards:</strong> Select any prompt suggestion to get an immediate detailed answer.</li>
                  <li><strong>Copy:</strong> Copy code blocks or full answers with a single tap.</li>
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
