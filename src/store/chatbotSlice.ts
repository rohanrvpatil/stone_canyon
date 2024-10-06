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
} = chatbotSlice.actions;

export default chatbotSlice.reducer;
