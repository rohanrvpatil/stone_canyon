export interface ChatbotNode {
  question: string;
  options: { [key: string]: ChatbotNode | string };
}

export interface ChatMessage {
  id: string;
  type: "question" | "answer" | "options" | "error";
  text: string | string[]; // Can be a string or an array of options
  isUser: boolean;
}

export interface ChatbotState {
  chatbotOpen: boolean;
  chatbotTree: ChatbotNode | null;
  currentNode: ChatbotNode | null;
  messages: ChatMessage[];
  currentInput: string;
  currentInputIndex: number;
  validationMessage: string;
  questionFunnel: string;
}

export interface ChatbotProps {
  categoryId: number;
}

export interface ChatHistoryProps {
  history: ChatMessage[]; // Array of chat messages
}
