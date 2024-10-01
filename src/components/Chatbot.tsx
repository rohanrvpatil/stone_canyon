import React, { useState } from "react";
import styles from "../styles/Chatbot.module.css";

interface ChatbotProps {
  size?: number;
}

const Chatbot: React.FC<ChatbotProps> = ({ size = 60 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>(
    []
  );

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([{ text: "Hi, how may I help you?", isBot: true }]);
    }
  };

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      const userMessage = e.currentTarget.value;
      setMessages([...messages, { text: userMessage, isBot: false }]);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Chatbot</h3>
            <button onClick={toggleChat} className={styles.closeButton}>
              &times;
            </button>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.isBot ? styles.botMessage : styles.userMessage
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            className={styles.chatInput}
            onKeyPress={handleSendMessage}
          />
        </div>
      )}
      <button
        onClick={toggleChat}
        className={styles.chatButton}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={styles.chatIcon}
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
        </svg>
      </button>
    </div>
  );
};

export default Chatbot;
