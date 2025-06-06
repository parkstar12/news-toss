import { createChatBotMessage } from "react-chatbot-kit";

const botName = "NewsToss";

const config = {
  initialMessages: [
    createChatBotMessage(`${botName} 입니다~~`, {}),
    createChatBotMessage(`무엇이든 질문해주쇼`, {
      // @ts-ignore
      withAvatar: true,
      widget: "my-widget",
      payload: { age: 18, name: "Christina" },
      delay: 500,
    }),
  ],
};

export default config;
