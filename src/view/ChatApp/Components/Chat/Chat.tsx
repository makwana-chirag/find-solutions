import queryString from "query-string";
import { KeyboardEvent, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { InforBar } from "../infoBar/InforBar";
import "./Chat.css";
import { Input } from "../Input/Input";
import { Messages } from "../Messages/Messages";

let socket: Socket;

export const Chat = (location: { search: string }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  console.log("🚀 ~ Chat ~ message:", message);
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  console.log("🚀 ~ Chat ~ messages:", messages);
  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const { name = "", room = "" } = queryString.parse(location.search);
    setRoom(room as string);
    setName(name as string);
    socket = io(ENDPOINT);

    socket.emit("join", { name, room }, ({ error }: { error: string }) => {
      alert(error);
    });

    // return () => {
    //   socket.emit("disconnect");
    //   socket.off();
    // };
  }, [location.search, ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }: { users: string }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };
  return (
    <div className="outerContainer">
      <div className="container">
        <InforBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};
