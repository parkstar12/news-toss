import React, { cloneElement } from "react";

// 챗봇이 수행할 수 있는 액션을 정의
const ActionProvider = ({
  createChatBotMessage,
  setState,
  children,
}: {
  createChatBotMessage: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  children: React.ReactNode;
}) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("ㅎㅇ요");

    // @ts-ignore
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleUnknownMessage = () => {
    const botMessage = createChatBotMessage(
      "ㅈㅅ 뭐라하는건가요? 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세"
    );

    // @ts-ignore
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        // @ts-ignore
        return cloneElement(child, {
          actions: {
            handleHello,
            handleUnknownMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
