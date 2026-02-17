import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import "./Chatbot.css";

const RAG_API_URL = "https://rag-app-kvjf.onrender.com";

const Chatbot = ({ predictionResult = null }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      role: "bot",
      text: "Hi! I'm your DermAI assistant. I can help you understand skin conditions, answer questions about your analysis results, and provide general health information. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // When prediction arrives, add context greeting
  useEffect(() => {
    if (predictionResult && predictionResult.prediction) {
      const confidence = (predictionResult.confidence * 100).toFixed(1);
      setChat([
        {
          role: "bot",
          text: "Hi! I'm your DermAI assistant. How can I help you today?",
        },
        {
          role: "bot",
          text: `Your analysis detected **${predictionResult.prediction}** with **${confidence}% confidence**. Ask me anything about this condition!`,
        },
      ]);
    }
  }, [predictionResult]);

  const sendMessage = async (overrideText) => {
    const rawText = (overrideText ?? message).trim();
    if (!rawText) return;

    // ✅ Enrich the question with disease context for better RAG answers
    let enrichedQuestion = rawText;
    if (predictionResult && predictionResult.prediction) {
      const confidence = (predictionResult.confidence * 100).toFixed(1);

      // Map vague questions to specific ones
      const vagueMap = {
        "what should i do next": `The patient has been diagnosed with ${predictionResult.prediction} at ${confidence}% confidence. What specific steps, precautions, and treatments should they follow immediately?`,
        "what should i do":      `The patient has been diagnosed with ${predictionResult.prediction} at ${confidence}% confidence. What specific steps, precautions, and treatments should they follow immediately?`,
        "when should i see a doctor": `For a patient with ${predictionResult.prediction} (${confidence}% confidence), when should they seek medical attention and what are the warning signs that need urgent care?`,
        "how to prevent this":   `How can someone prevent ${predictionResult.prediction} and avoid spreading it to others?`,
        "is it contagious":      `Is ${predictionResult.prediction} contagious? How does it spread and how can it be prevented?`,
        "how serious is it":     `How serious is ${predictionResult.prediction}? What are the potential complications if left untreated?`,
      };

      const lowerRaw = rawText.toLowerCase();
      const matchedKey = Object.keys(vagueMap).find(k => lowerRaw.includes(k));
      if (matchedKey) {
        enrichedQuestion = vagueMap[matchedKey];
      } else {
        // Append disease context to any question
        enrichedQuestion = `Regarding ${predictionResult.prediction} (confidence: ${confidence}%): ${rawText}`;
      }
    }

    setChat((prev) => [...prev, { role: "user", text: rawText }]); // Show original text
    setMessage("");
    setLoading(true);

    try {
      const requestBody = {
        question: enrichedQuestion, // Send enriched question to RAG
      };

      if (predictionResult && predictionResult.prediction) {
        requestBody.disease = predictionResult.prediction;
        requestBody.confidence = predictionResult.confidence;
      }

      const res = await fetch(`${RAG_API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();

      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.answer || "I'm here to help! Could you rephrase your question?",
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = predictionResult && predictionResult.prediction
    ? [
        `What is ${predictionResult.prediction}?`,
        `Symptoms of ${predictionResult.prediction}?`,
        "What should I do next?",
        "When should I see a doctor?",
      ]
    : [
        "What is chickenpox?",
        "How can I prevent skin diseases?",
        "When should I see a doctor?",
        "How does the AI analysis work?",
      ];

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="chatbot-fab"
            onClick={() => setOpen(true)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {chat.length > 1 && (
              <div className="notification-badge">{chat.length - 1}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="chatbot-window"
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="header-content">
                <div className="bot-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </div>
                <div className="header-info">
                  <h3>DermAI Assistant</h3>
                  <p className="status">
                    <span className="status-dot"></span>
                    {predictionResult ? `Context: ${predictionResult.prediction}` : "Online"}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="close-button"
                onClick={() => setOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>
            </div>

            {/* Messages */}
            <div className="chatbot-box" ref={chatBoxRef}>
              <AnimatePresence initial={false}>
                {chat.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className={`chat-message ${c.role}`}
                  >
                    {c.role === "bot" && (
                      <div className="message-avatar">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                      </div>
                    )}
                    <div className="message-bubble">
                      <div className="markdown-content">
                        <ReactMarkdown>{c.text}</ReactMarkdown>
                      </div>
                      <span className="message-time">
                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="chat-message bot"
                >
                  <div className="message-avatar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>
                  </div>
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </motion.div>
              )}

              {/* Quick Questions */}
              {chat.length <= 2 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="quick-questions"
                >
                  <p className="quick-questions-label">Quick questions:</p>
                  <div className="quick-questions-grid">
                    {quickQuestions.map((q, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="quick-question-btn"
                        onClick={() => sendMessage(q)}
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="chatbot-input-box">
              <div className="input-wrapper">
                <input
                  ref={inputRef}
                  className="chatbot-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    predictionResult
                      ? `Ask about ${predictionResult.prediction}...`
                      : "Type your message..."
                  }
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="chatbot-send-button"
                  onClick={() => sendMessage()}
                  disabled={!message.trim() || loading}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </motion.button>
              </div>
              <p className="input-hint">Press Enter to send</p>
            </div>

            <div className="chatbot-footer">
              <span>Powered by AI · For educational purposes only</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;