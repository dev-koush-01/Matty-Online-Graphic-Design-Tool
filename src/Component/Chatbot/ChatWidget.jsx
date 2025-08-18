import React, { useState, useRef, useEffect } from "react";
import chatbotIcon from "../../assets/chatbot_icon.png";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    const userMessage = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      // Add AI reply
      setMessages((prev) => [...prev, { text: data.reply, sender: "ai" }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error connecting to AI.", sender: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating AI Button */}
      <button
        className="bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={chatbotIcon} alt="AI" className="w-7 h-7" />
      </button>

      {/* Chat Popup */}
      <div
        className={`fixed bottom-24 right-5 w-80 max-h-[500px] bg-white shadow-2xl rounded-xl flex flex-col transition-transform duration-300 overflow-hidden ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-purple-600 text-white px-4 py-2 flex justify-between items-center">
          <span>Matty AI Chat</span>
          <button onClick={() => setIsOpen(false)} className="text-xl">
            &times;
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`px-3 py-2 rounded-xl max-w-[75%] break-words ${
                msg.sender === "user"
                  ? "bg-purple-600 text-white self-end"
                  : "bg-gray-200 text-gray-900 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 text-sm italic">AI is typing...</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="flex border-t border-gray-300" onSubmit={handleSend}>
          <textarea
            placeholder="Ask me about design..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-3 py-2 focus:outline-none text-sm resize-none"
            rows={1}
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 hover:bg-purple-700 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;
