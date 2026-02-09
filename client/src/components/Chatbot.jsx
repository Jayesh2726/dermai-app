import { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { role: "user", text: message }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setChat((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "No response" },
      ]);
    } catch {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "Server error 😕" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔵 Floating Button */}
      <div className="chatbot-fab" onClick={() => setOpen(true)}>
        🤖
      </div>

      {/* 💬 Chat Window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>DermAI Assistant</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chatbot-box">
            {chat.map((c, i) => (
              <div key={i} className={`chat-message ${c.role}`}>
                {c.text}
              </div>
            ))}
            {loading && <div className="chatbot-typing">Typing...</div>}
          </div>

          <div className="chatbot-input-box">
            <input
              className="chatbot-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about skin disease..."
            />
            <button className="chatbot-button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
