// data
import userDataQuestions from "../../backend/data/userDataQuestions.json";

// components
import { fetchUserDataQuestions } from "./ChatbotAPI";

// redux

import {
  setCurrentNode,
  setCurrentInput,
  addMessage,
  setCurrentInputIndex,
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
    const updatedUserData: UserData = {
      ...userData,
      [currentQuestionKey]: currentInput,
    };

    dispatch(setUserData(updatedUserData));

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
    dispatch(setCurrentInput(""));
  }
};
