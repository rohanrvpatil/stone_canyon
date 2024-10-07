// general
import { KeyboardEvent } from "react";
import { MutableRefObject } from "react";

// data
import userDataQuestions from "../../backend/data/userDataQuestions.json";

// components
import { fetchUserDataQuestions } from "./ChatbotAPI";
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateZipCode,
  validateFullAddress,
} from "./userInputValidation";

// redux
import {
  setCurrentNode,
  // setCurrentInput,
  addMessage,
  setCurrentInputIndex,
  // setValidationMessage,
} from "../store/chatbotSlice";
import { setUserData } from "../store/userSlice";

// interfaces
import { ChatbotNode } from "../interfaces/chatbotInterfaces";
import { UserData } from "../interfaces/userInterfaces";

export const createChatbotNode = (question: string): ChatbotNode => ({
  question,
  options: {},
});

export const handleOptionClick = (
  dispatch: any,
  currentNode: ChatbotNode | null,
  option: string
) => {
  if (currentNode && currentNode.options[option]) {
    const nextNode = currentNode.options[option] as ChatbotNode;

    dispatch(
      addMessage({
        id: `question-${Date.now()}`,
        text: currentNode.question,
        isUser: false,
        type: "question",
      })
    );

    dispatch(
      addMessage({
        id: `options-${Date.now()}`,
        text: Object.keys(currentNode.options),
        isUser: false,
        type: "options",
      })
    );

    dispatch(
      addMessage({
        id: `user-${Date.now()}`,
        text: option,
        isUser: true,
        type: "answer",
      })
    );

    dispatch(setCurrentNode(nextNode));

    if (
      !nextNode ||
      !nextNode.options ||
      Object.keys(nextNode.options).length === 0
    ) {
      fetchUserDataQuestions(dispatch);
    }
  }
};

export const handleUserInput = (
  dispatch: any,
  userData: UserData,
  currentInput: string,
  currentInputIndex: number,
  currentNode: ChatbotNode | null
) => {
  // state

  const currentQuestionKey = userDataQuestions[currentInputIndex]?.key;

  if (currentNode) {
    let errorMessage: string | null = null;
    // Validate input based on the current question

    switch (currentQuestionKey) {
      case "fullName":
        errorMessage = validateFullName(currentInput);
        break;
      case "emailAddress":
        errorMessage = validateEmail(currentInput);
        break;
      case "phoneNumber":
        errorMessage = validatePhone(currentInput);
        break;
      case "zipCode":
        errorMessage = validateZipCode(currentInput);
        break;
      case "fullAddress":
        errorMessage = validateFullAddress(currentInput);
        break;
      default:
        break;
    }

    dispatch(
      addMessage({
        id: `question-${Date.now()}`,
        text: currentNode.question,
        isUser: false,
        type: "question",
      })
    );

    dispatch(
      addMessage({
        id: `user-${Date.now()}`,
        text: currentInput,
        isUser: true,
        type: "answer",
      })
    );

    if (errorMessage) {
      dispatch(
        addMessage({
          id: `error-${Date.now()}`,
          text: errorMessage,
          isUser: false,
          type: "error",
        })
      );

      return;
    }

    const updatedUserData: UserData = {
      ...userData,
      [currentQuestionKey]: currentInput,
    };

    dispatch(setUserData(updatedUserData));

    if (currentInputIndex < userDataQuestions.length - 1) {
      const newIndex = currentInputIndex + 1;
      dispatch(setCurrentInputIndex(newIndex));
      const nextNode = createChatbotNode(
        userDataQuestions[currentInputIndex + 1].question
      );
      dispatch(setCurrentNode(nextNode));
    } else {
      console.log(userData);
      dispatch(setCurrentNode(null));
    }
  }
  // dispatch(setCurrentInput(""));
};

export const handleKeyDown = (
  dispatch: any, // Type this properly based on your dispatch type
  userData: UserData,
  currentInput: string,
  currentInputIndex: number,
  currentNode: ChatbotNode | null
) => {
  return (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action
      handleUserInput(
        dispatch,
        userData,
        currentInput,
        currentInputIndex,
        currentNode
      );
    }
  };
};

export const clearInputValue = (
  inputRef: MutableRefObject<HTMLInputElement | null>
) => {
  if (inputRef.current) {
    inputRef.current.value = ""; // Directly manipulate the input field's value
  }
};
