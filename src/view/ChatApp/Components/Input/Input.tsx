import { KeyboardEvent } from "react";
import "./Input.css";
export const Input = ({
  message,
  setMessage,
  sendMessage,
}: {
  message: string;
  sendMessage: (event: KeyboardEvent<HTMLInputElement>) => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        Send
      </button>
    </form>
  );
};
