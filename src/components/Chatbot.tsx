import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

// styles
import styles from "../styles/Chatbot.module.css";
import "react-toastify/dist/ReactToastify.css";

// icons
import ForumSharpIcon from "@mui/icons-material/ForumSharp";
import SendIcon from "@mui/icons-material/Send";

// components
import ChatHistory from "./ChatHistory";

interface ChatbotNode {
  question: string;
  options: { [key: string]: ChatbotNode | string };
}

interface ChatMessage {
  type: "question" | "answer" | "options";
  text: string | string[];
  isUser: boolean;
}

interface ChatbotProps {
  categoryId: number;
}

const Chatbot: React.FC<ChatbotProps> = ({ categoryId }) => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const [_, setChatbotTree] = useState<ChatbotNode | null>(null);
  const [currentNode, setCurrentNode] = useState<ChatbotNode | null>(null);
  // const [history, setHistory] = useState<ChatbotNode[]>([]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const fetchCategoryTree = (categoryId: number) => {
    fetch(`http://localhost:3000/chatbot-tree?categoryId=${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setChatbotTree(data);
        setCurrentNode(data);
      })
      .catch((error) => {
        console.error("Error fetching chatbot tree:", error);
      });
  };

  const fetchUserDataQuestions = () => {
    fetch(`http://localhost:3000/user-data-questions`)
      .then((res) => res.json())
      .then((data) => {
        setChatbotTree(data);
        setCurrentNode(data);
      })
      .catch((error) => {
        console.error("Error fetching User data questions:", error);
      });
  };

  // useEffect(() => {}, []);

  const handleOptionClick = (option: string) => {
    if (currentNode && currentNode.options[option]) {
      const nextNode = currentNode.options[option] as ChatbotNode;

      setMessages((prev) => [
        ...prev,
        { text: currentNode.question, isUser: false, type: "question" },
      ]);

      setMessages((prev) => [
        ...prev,
        {
          text: Object.keys(currentNode.options),
          isUser: false,
          type: "options",
        },
      ]);

      setMessages((prev) => [
        ...prev,
        { text: option, isUser: true, type: "answer" },
      ]);

      setCurrentNode(nextNode);
    }
  };

  const toggleChatbot = () => {
    if (categoryId >= 1 && categoryId <= 7) {
      fetchCategoryTree(categoryId);
      setChatbotOpen(!chatbotOpen);
    } else {
      toast.dismiss();
      toast.error(
        "Invalid Category ID entered. Please enter a value between 1 and 7.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.chatbotIcon} onClick={toggleChatbot}>
        <ForumSharpIcon fontSize="large" />
      </div>
      {chatbotOpen && (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatbotHeader}>
            <p style={{ marginLeft: "8px", fontWeight: "bold" }}>Chatbot</p>
          </div>

          <div className={styles.chatbotBody}>
            <ChatHistory history={messages} />
            {currentNode && Object.keys(currentNode.options).length > 0 && (
              <>
                <div className={styles.questionContainer}>
                  <p className={styles.question}>{currentNode.question}</p>
                </div>

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
          <div className={styles.userInputContainer}>
            <input
              type="text"
              placeholder="Message..."
              className={styles.userInputField}
            />
            <div className={styles.userSendButton}>
              <SendIcon fontSize="medium" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
