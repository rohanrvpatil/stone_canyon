import { setChatbotTree, setCurrentNode } from "../store/chatbotSlice";

import { ChatbotNode } from "../interfaces/chatbotInterfaces";

export const createChatbotNode = (question: string): ChatbotNode => ({
  question,
  options: {},
});

export const fetchCategoryTree = (dispatch: any, categoryId: number) => {
  fetch(`http://localhost:3000/chatbot-tree?categoryId=${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      dispatch(setChatbotTree(data));
      dispatch(setCurrentNode(data));
    })
    .catch((error) => {
      console.error("Error fetching chatbot tree:", error);
    });
};

export const fetchUserDataQuestions = (dispatch: any) => {
  fetch(`http://localhost:3000/user-data-questions`)
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        console.log("All questions have been answered");
      } else {
        // console.log(data);

        const userQuestionNode = createChatbotNode(data.question);

        dispatch(setChatbotTree(userQuestionNode));
        dispatch(setCurrentNode(userQuestionNode));
      }
    })
    .catch((error) => {
      console.error("Error fetching User data questions:", error);
    });
};

export const updateServiceId = (questionFunnel: string) => {
  fetch("http://localhost:3000/update-service-id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Question-Funnel": questionFunnel,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log("Service ID updated successfully.");
    })
    .catch((error) => {
      console.error("Failed to update service ID:", error);
    });
};
