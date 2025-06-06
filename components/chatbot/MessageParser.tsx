import React from "react";

// 사용자의 입력을 해석하고 적절한 액션을 수행
const MessageParser = ({
  children,
  actions,
}: {
  children: React.ReactNode;
  actions: any;
}) => {
  const parse = (message: string) => {
    if (message.includes("안녕") || message.includes("ㅎㅇ")) {
      actions.handleHello();
    } else {
      actions.handleUnknownMessage();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        // @ts-ignore
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
