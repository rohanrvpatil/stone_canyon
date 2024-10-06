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

// data
import userDataQuestions from "../../backend/data/userDataQuestions.json";

interface ChatbotNode {
  question: string;
  options: { [key: string]: ChatbotNode | string };
}

interface ChatMessage {
  id: string;
  type: "question" | "answer" | "options";
  text: string | string[]; // Can be a string or an array of options
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

  const [userData, setUserData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    zipCode: "",
    fullAddress: "",
  });

  const [currentInput, setCurrentInput] = useState("");
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const createChatbotNode = (question: string): ChatbotNode => ({
    question,
    options: {}, // No options for this node
  });

  const fetchCategoryTree = (categoryId: number) => {
    fetch(`http://localhost:3000/chatbot-tree?categoryId=${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
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
        if (data.message) {
          console.log("All questions have been answered");
        } else {
          // console.log(data);

          const userQuestionNode = createChatbotNode(data.question);

          setChatbotTree(userQuestionNode);
          setCurrentNode(userQuestionNode);
        }
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
        {
          id: `question-${Date.now()}`,
          text: currentNode.question,
          isUser: false,
          type: "question",
        },
        {
          id: `options-${Date.now()}`,
          text: Object.keys(currentNode.options),
          isUser: false,
          type: "options",
        },
        {
          id: `user-${Date.now()}`,
          text: option,
          isUser: true,
          type: "answer",
        },
      ]);

      setCurrentNode(nextNode);

      if (
        !nextNode ||
        !nextNode.options ||
        Object.keys(nextNode.options).length === 0
      ) {
        fetchUserDataQuestions();
      }
    }
  };

  const handleUserInput = () => {
    const currentQuestionKey = userDataQuestions[currentInputIndex]?.key;

    if (currentNode) {
      setUserData((prev) => ({
        ...prev,
        [currentQuestionKey]: currentInput,
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `question-${Date.now()}`,
          text: currentNode.question,
          isUser: false,
          type: "question",
        },
        {
          id: `user-${Date.now()}`,
          text: currentInput,
          isUser: true,
          type: "answer",
        },
      ]);

      if (currentInputIndex < userDataQuestions.length - 1) {
        setCurrentInputIndex((prevIndex) => prevIndex + 1);
        // setCurrentInputIndex(currentInputIndex + 1);
        const nextNode = createChatbotNode(
          userDataQuestions[currentInputIndex + 1].question
        );
        setCurrentNode(nextNode);
      } else {
        // Handle the end of the question s, e.g., save to CSV or JSON
        setCurrentNode(null);
      }
      setCurrentInput("");
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
            {/* && Object.keys(currentNode.options).length > 0 */}
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
            {currentNode && Object.keys(currentNode.options).length === 0 && (
              <>
                <div className={styles.questionContainer}>
                  <p className={styles.question}>{currentNode.question}</p>
                </div>
              </>
            )}
          </div>
          <div className={styles.userInputContainer}>
            <input
              type="text"
              placeholder="Message..."
              className={styles.userInputField}
              onChange={(e) => setCurrentInput(e.target.value)}
            />
            <div className={styles.userSendButton} onClick={handleUserInput}>
              <SendIcon fontSize="medium" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
