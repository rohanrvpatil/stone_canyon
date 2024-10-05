import React from "react";

import styles from "../styles/Chatbot.module.css";

// Sample Chat History Structure
interface ChatMessage {
  type: "question" | "answer" | "options";
  text: string | string[]; // Can be a string or an array of options
  isUser: boolean;
}

interface ChatHistoryProps {
  history: ChatMessage[]; // Array of chat messages
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ history }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {history.map((message, index) => {
        if (message.type === "options") {
          return (
            <div key={index} className={styles.optionsContainer}>
              {Array.isArray(message.text) && // Check if text is an array
                message.text.map((option, idx) => (
                  <button key={idx} className={styles.option}>
                    {option} {/* Display each option */}
                  </button>
                ))}
            </div>
          );
        }

        return (
          <p
            key={index}
            className={
              message.type === "question" ? styles.question : styles.answer
            }
          >
            {message.text}
          </p>
        );
      })}
    </div>
  );
};
export default ChatHistory;
