interface ChatNode {
  id: string;
  message: string;
  options?: { text: string; nextId: string }[];
}

const ChatbotFlow: Record<string, ChatNode> = {
  start: {
    id: "start",
    message: "Hello! How can I help you today?",
    options: [
      { text: "Product Information", nextId: "product_info" },
      { text: "Pricing", nextId: "pricing" },
      { text: "Support", nextId: "support" },
    ],
  },
  product_info: {
    id: "product_info",
    message: "What would you like to know about our products?",
    options: [
      { text: "Features", nextId: "features" },
      { text: "Compatibility", nextId: "compatibility" },
      { text: "Go back", nextId: "start" },
    ],
  },
  pricing: {
    id: "pricing",
    message:
      "Our pricing plans start at $9.99/month. Would you like more details?",
    options: [
      { text: "Yes, please", nextId: "pricing_details" },
      { text: "No, thanks", nextId: "start" },
    ],
  },
  support: {
    id: "support",
    message: "What kind of support do you need?",
    options: [
      { text: "Technical Support", nextId: "tech_support" },
      { text: "Billing Support", nextId: "billing_support" },
      { text: "Go back", nextId: "start" },
    ],
  },
  // Add more nodes as needed
};

export default ChatbotFlow;
