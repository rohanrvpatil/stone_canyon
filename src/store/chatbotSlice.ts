import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interfaces
import {
  ChatbotNode,
  ChatMessage,
  ChatbotState,
} from "../interfaces/chatbotInterfaces";

const initialState: ChatbotState = {
  chatbotOpen: false,
  chatbotTree: null,
  currentNode: null,
  messages: [],
  currentInput: "",
  currentInputIndex: 0,
  validationMessage: "",
  questionFunnel: "",
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    setChatbotOpen(state, action: PayloadAction<boolean>) {
      state.chatbotOpen = action.payload;
    },
    setChatbotTree(state, action: PayloadAction<ChatbotNode | null>) {
      state.chatbotTree = action.payload;
    },
    setCurrentNode(state, action: PayloadAction<ChatbotNode | null>) {
      state.currentNode = action.payload;
    },
    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },
    setCurrentInput(state, action: PayloadAction<string>) {
      state.currentInput = action.payload;
    },
    setCurrentInputIndex(state, action: PayloadAction<number>) {
      state.currentInputIndex = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    setValidationMessage: (state, action: PayloadAction<string>) => {
      state.validationMessage = action.payload; // Update validation message state
    },
    setQuestionFunnel: (state, action: PayloadAction<string>) => {
      state.questionFunnel = action.payload; // Update validation message state
    },
  },
});

export const {
  setChatbotOpen,
  setChatbotTree,
  setCurrentNode,
  setMessages,
  setCurrentInput,
  setCurrentInputIndex,
  addMessage,
  setValidationMessage,
  setQuestionFunnel,
} = chatbotSlice.actions;

export default chatbotSlice.reducer;
