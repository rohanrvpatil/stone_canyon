import React, { useState } from "react";
import styles from "../styles/Chatbot.module.css";

// components
import ChatbotFlow from "./ChatbotFlow";

interface ChatbotProps {
  size?: number;
}

interface Message {
  text: string;
  isBot: boolean;
  options?: { text: string; nextId: string }[];
}

const Chatbot: React.FC<ChatbotProps> = ({ size = 60 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState("start");

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      const startNode = ChatbotFlow[currentNodeId];
      setMessages([
        {
          text: startNode.message,
          isBot: true,
          options: startNode.options,
        },
      ]);
    }
  };

  const handleOptionClick = (nextId: string) => {
    const nextNode = ChatbotFlow[nextId];
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: nextNode.message, isBot: true, options: nextNode.options },
    ]);
    setCurrentNodeId(nextId);
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
              <div key={index}>
                <div
                  className={`${styles.message} ${
                    message.isBot ? styles.botMessage : styles.userMessage
                  }`}
                >
                  {message.text}
                </div>
                {message.options && (
                  <div className={styles.options}>
                    {message.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionClick(option.nextId)}
                        className={styles.optionButton}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
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
