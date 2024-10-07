import React from "react";

import styles from "../Chatbot/Chatbot.module.css";

// interfaces
import { ChatHistoryProps } from "../interfaces";

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
        } else if (message.type === "question") {
          return (
            <div key={message.id} className={styles.questionContainer}>
              <p className={styles.question}>{message.text}</p>
            </div>
          );
        } else if (message.type === "answer") {
          return (
            <div key={message.id} className={styles.answerContainer}>
              <p className={styles.answer}>{message.text}</p>
            </div>
          );
        } else {
          return (
            <div key={message.id} className={styles.validationErrorContainer}>
              <p className={styles.validationError}>{message.text}</p>
            </div>
          );
        }
      })}
    </div>
  );
};
export default ChatHistory;
