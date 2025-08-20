import ScrollToBottom from "react-scroll-to-bottom";
import { Message } from "./Message/Message";

export const Messages = ({
  messages,
  name,
}: {
  messages: { user: string; text: string }[];
  name: string;
}) => {
  return (
    <ScrollToBottom>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};
