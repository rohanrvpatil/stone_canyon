import React from "react";

import styles from "../Chatbot/Chatbot.module.css";

// Sample Chat History Structure
interface ChatMessage {
  id: string;
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
      {history.map((message) => {
        if (message.type === "options") {
          return (
            <div key={message.id} className={styles.optionsContainer}>
              {Array.isArray(message.text) && // Check if text is an array
                message.text.map((option, idx) => (
                  <button
                    key={`${message.id}-option-${idx}`}
                    className={styles.option}
                  >
                    {option} {/* Display each option */}
                  </button>
                ))}
            </div>
          );
        }

        return (
          <div
            key={message.id}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {message.type === "question" ? (
              <div className={styles.questionContainer} key={message.id}>
                <p className={styles.question}>{message.text}</p>
              </div>
            ) : (
              <p className={styles.answer} key={message.id}>
                {message.text}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default ChatHistory;
