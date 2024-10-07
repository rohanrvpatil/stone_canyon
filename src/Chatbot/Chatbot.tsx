// general
import React from "react";
import { ToastContainer } from "react-toastify";

// styles
import styles from "./Chatbot.module.css";
import "react-toastify/dist/ReactToastify.css";

// icons
import ForumSharpIcon from "@mui/icons-material/ForumSharp";
import SendIcon from "@mui/icons-material/Send";

// components and functions
import ChatHistory from "./ChatHistory";
import { fetchCategoryTree } from "./ChatbotAPI";
import {
  handleOptionClick,
  handleUserInput,
  handleKeyDown,
} from "./ChatbotInput";
import { toggleChatbot } from "./ChatbotUtils";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  // setChatbotTree,
  setCurrentInput,
  // setMessages,
  setChatbotOpen,
} from "../store/chatbotSlice";

// interfaces
import { ChatbotProps } from "../interfaces/chatbotInterfaces";

const Chatbot: React.FC<ChatbotProps> = ({ categoryId }) => {
  // state
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const currentInput = useSelector(
    (state: RootState) => state.chatbot.currentInput
  );
  const currentInputIndex = useSelector(
    (state: RootState) => state.chatbot.currentInputIndex
  );

  const chatbotOpen = useSelector(
    (state: RootState) => state.chatbot.chatbotOpen
  );
  const currentNode = useSelector(
    (state: RootState) => state.chatbot.currentNode
  );
  const messages = useSelector((state: RootState) => state.chatbot.messages);
  const validationMessage = useSelector(
    (state: RootState) => state.chatbot.validationMessage
  );

  return (
    <>
      <ToastContainer />
      <div
        className={styles.chatbotIcon}
        onClick={() =>
          toggleChatbot(
            dispatch,
            categoryId,
            chatbotOpen,
            fetchCategoryTree,
            setChatbotOpen
          )
        }
      >
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
                      onClick={() =>
                        handleOptionClick(dispatch, currentNode, option)
                      }
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
            {validationMessage && ( // Add validation message rendering
              <div className={styles.validationErrorContainer}>
                <p className={styles.validationError}>{validationMessage}</p>
              </div>
            )}
          </div>
          <div className={styles.userInputContainer}>
            <input
              type="text"
              placeholder="Message..."
              className={styles.userInputField}
              onChange={(e) => dispatch(setCurrentInput(e.target.value))}
              onKeyDown={handleKeyDown(
                dispatch,
                userData,
                currentInput,
                currentInputIndex,
                currentNode
              )}
            />
            <div
              className={styles.userSendButton}
              // onClick={handleUserInput(dispatch)}
              onClick={() =>
                handleUserInput(
                  dispatch,
                  userData,
                  currentInput,
                  currentInputIndex,
                  currentNode
                )
              }
            >
              <SendIcon fontSize="medium" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
