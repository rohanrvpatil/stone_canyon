export interface ChatbotNode {
  question: string;
  options: { [key: string]: ChatbotNode | string };
}

export interface ChatMessage {
  id: string;
  type: "question" | "answer" | "options";
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
}
