import { useState } from "React";

// styles
import styles from "../styles/Chatbot.module.css";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";

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
      {chatbotOpen && <div className={styles.chatbotWindow}></div>}
    </>
  );
};

export default Chatbot;
