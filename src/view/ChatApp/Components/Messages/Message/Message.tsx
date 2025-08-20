import { useState } from "react";

export const Message = ({
  message,
  name,
}: {
  message: { user: string; text: string };
  name: string;
}) => {
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const trimmedName = name.trim().toLocaleLowerCase();

  if (message.user === trimmedName) {
    setIsCurrentUser(true);
  }
  return isCurrentUser ? (
    <div className="messageContainer justify-end">
      <p className="sendText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message.text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message.text}</p>
        <p className="sendText pl-10">{message.user}</p>
      </div>
    </div>
  );
};
