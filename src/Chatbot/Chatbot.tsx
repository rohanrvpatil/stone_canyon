// general
import React, { useRef, useEffect, useState } from "react";
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
import UserDataModal from "./UserDataModal";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  // setChatbotTree,
  setCurrentInput,
  // setMessages,
  setChatbotOpen,
} from "../store/chatbotSlice";
import { closeModal } from "../store/modalSlice";

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
  const questionFunnel = useSelector(
    (state: RootState) => state.chatbot.questionFunnel
  );
  const isOpen = useSelector((state: any) => state.modal.isOpen);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [localInput, setLocalInput] = useState(currentInput);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isOpen ? (
              <UserDataModal
                dispatch={dispatch}
                isOpen={isOpen}
                userData={userData}
                onClose={closeModal}
              />
            ) : null}
          </div>
          <div className={styles.chatbotHeader}>
            <p style={{ marginLeft: "8px", fontWeight: "bold" }}>Chatbot</p>
          </div>

          <div className={styles.chatbotBody} ref={chatContainerRef}>
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
                        handleOptionClick(
                          dispatch,
                          currentNode,
                          option,
                          questionFunnel,
                          userData
                        )
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
            {validationMessage && (
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
              value={localInput}
              onChange={(e) => {
                setLocalInput(e.target.value);
                dispatch(setCurrentInput(e.target.value));
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleKeyDown(
                    dispatch,
                    userData,
                    currentInput,
                    currentInputIndex,
                    currentNode
                  )(event);
                  setLocalInput("");
                  dispatch(setCurrentInput(""));
                }
              }}
            />
            <div
              className={styles.userSendButton}
              onClick={() => {
                handleUserInput(
                  dispatch,
                  userData,
                  currentInput,
                  currentInputIndex,
                  currentNode
                );
                setLocalInput("");
                dispatch(setCurrentInput(""));
              }}
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
