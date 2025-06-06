"use client";

import { Chatbot } from "react-chatbot-kit";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const ChatBot = () => {
  return (
    <Chatbot
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
      headerText="NewsToss 챗봇"
      placeholderText="질문 주세요~"
    />
  );
};

export default ChatBot;
