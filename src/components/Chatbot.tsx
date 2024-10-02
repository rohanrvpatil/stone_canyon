import { useState } from "react";

// styles
import styles from "../styles/Chatbot.module.css";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";

// components
import questions from "./questions";

const Chatbot = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  return (
    <>
      <div className={styles.chatbotIcon} onClick={toggleChatbot}>
        <ForumSharpIcon fontSize="large" />
      </div>
      {chatbotOpen && (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatbotHeader}>
            <p style={{ marginLeft: "14px", fontWeight: "bold" }}>Chatbot</p>
          </div>
          <div className={styles.chatbotBody}>
            <p className={styles.question}>{questions[0].question}</p>
            <div className={styles.optionsContainer}>
              <p className={styles.option}>{questions[0].options[0]}</p>
              <p className={styles.option}>{questions[0].options[1]}</p>
              <p className={styles.option}>{questions[0].options[2]}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
