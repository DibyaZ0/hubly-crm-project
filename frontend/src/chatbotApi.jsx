
export const fetchChatMessages = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          customMessages: [
            "How can I help you?",
            "Ask me anything!"
          ],
          welcomeMessage: "👋 Want to chat about Hubly? I'm a chatbot here to help you find your way."
        });
      }, 500);
    });
  };
  
  export const sendMessageToBot = async (userMessage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (userMessage.toLowerCase().includes('hi') || userMessage.toLowerCase().includes('hello')) {
          resolve("Hello! How can I assist you today?");
        } else {
          resolve("I'm not sure I understand, but I'm here to help!");
        }
      }, 500);
    });
  };
  