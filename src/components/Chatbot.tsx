import React, { useEffect, useState } from "react";

// styles
import styles from "../styles/Chatbot.module.css";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";

// components
import questions from "./questions";

interface ChatbotNode {
  question: string;
  options: { [key: string]: ChatbotNode | string };
}

const Chatbot: React.FC = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const [chatbotTree, setChatbotTree] = useState<ChatbotNode | null>(null);
  const [currentNode, setCurrentNode] = useState<ChatbotNode | null>(null);
  const [history, setHistory] = useState<ChatbotNode[]>([]);

  useEffect(() => {
    // Fetch chatbot tree from backend
    fetch("http://localhost:3000/chatbot-tree")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setChatbotTree(data);
        setCurrentNode(data);
      })
      .catch((error) => {
        console.error("Error fetching chatbot tree:", error);
      });
  }, []);

  const handleOptionClick = (option: string) => {
    if (currentNode && currentNode.options[option]) {
      const nextNode = currentNode.options[option] as ChatbotNode;
      setHistory([...history, currentNode]);
      setCurrentNode(nextNode);
    }
  };

  const handleGoBack = () => {
    const prevNode = history.pop();
    if (prevNode) {
      setCurrentNode(prevNode);
      setHistory([...history]);
    }
  };

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

          {currentNode && (
            <div className={styles.chatbotBody}>
              <p className={styles.question}>{currentNode.question}</p>
              <div className={styles.optionsContainer}>
                {Object.keys(currentNode.options).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className={styles.option}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {history.length > 0 && (
                <button onClick={handleGoBack}>Go Back</button>
              )}
            </div>
          )}

          {/* <div className={styles.chatbotBody}>
            <p className={styles.question}>{questions[0].question}</p>
            <div className={styles.optionsContainer}>
              <p className={styles.option}>{questions[0].options[0]}</p>
              <p className={styles.option}>{questions[0].options[1]}</p>
              <p className={styles.option}>{questions[0].options[2]}</p>
            </div>
            <p className={styles.answer}>Red</p>
            <p className={styles.question}>Hellow </p>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Chatbot;
