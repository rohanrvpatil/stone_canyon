import React, { useEffect, useState } from "react";

// styles
import styles from "../styles/Chatbot.module.css";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";

// components
import ChatHistory from "./ChatHistory";

interface ChatbotNode {
  question: string;
  options: { [key: string]: ChatbotNode | string };
}

interface ChatMessage {
  type: "question" | "answer" | "options";
  text: string | string[]; // Can be a string or an array of options
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const [chatbotTree, setChatbotTree] = useState<ChatbotNode | null>(null);
  const [currentNode, setCurrentNode] = useState<ChatbotNode | null>(null);
  // const [history, setHistory] = useState<ChatbotNode[]>([]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

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

      setMessages((prev) => [
        ...prev,
        { text: currentNode.question, isUser: false, type: "question" }, // Add chatbot's current question
      ]);

      setMessages((prev) => [
        ...prev,
        {
          text: Object.keys(currentNode.options), // Store as an array
          isUser: false,
          type: "options",
        },
      ]);

      setMessages((prev) => [
        ...prev,
        { text: option, isUser: true, type: "answer" }, // Add user's message
      ]);

      setCurrentNode(nextNode);
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

          <div className={styles.chatbotBody}>
            <ChatHistory history={messages} />
            {currentNode && (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
