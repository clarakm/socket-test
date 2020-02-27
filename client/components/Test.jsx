import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const username = prompt("what is your username");

const socket = socketIOClient("http://localhost:3000", {
  transports: ["websocket", "polling"]
});
const Test = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //when you connect to the server, we are emit our username to the server so it can keep track of it
    socket.on("connect", () => {
      socket.emit("username", username);
    });
    socket.on("users", users => {
      setUsers(users);
    });
    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });
    socket.on("connected", user => {
      setUsers(users => [...users, user]);
    });
    socket.on("disconnected", id => {
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });
  }, []);

  const submit = event => {
    event.preventDefault();
    socket.emit("send", message);
    setMessage("");
  };

  return (
    <div>
      <h3>Hello {username}</h3>
      <div className="chatContainer">
        <h4>Messages</h4>
        <div className="chatLog">
          {messages.map(({ user, date, text }, index) => (
            <div key={index} className="row">
              <div className="chats">{date}</div>
              <div className="chats">{user}</div>
              <div className="chats">{text}</div>
            </div>
          ))}
        </div>
        <input
          className="inputBox"
          type="text"
          name="text"
          placeholder="chat here..."
          value={message}
          onChange={e => setMessage(e.currentTarget.value)}
        />
        <button className="button" onClick={submit}>
          send
        </button>
      </div>
      <div className="userContainer">
        <h5>Users</h5>
        <ul id="users">
          {users.map(({ name, id }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Test;
