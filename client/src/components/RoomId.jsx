import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../App.css";

const socket = io("http://localhost:3001");

export default function RoomId() {
  const [input, setInput] = useState("");
  const [recData, setRecData] = useState([]);
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const sendMessage = () => {
    const data = {
      author: email,
      message: input,
      roomId,
      time: new Date().toISOString(),
    };
    socket.emit("sendMessage", data);
    setRecData((prev) => [...prev, data]);
    setInput("");
  };

  const joinRoom = () => {
    if (roomId && email) {
      socket.emit("joinRoom", roomId);
      setShowChat(true);
    }
  };

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      console.log(data, "data");
      setRecData((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <div>
      {showChat ? (
        <div>
          <div>
            <input
              type="text"
              placeholder="message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>send </button>
            <div className="mainContainer">
              {recData.map((el, index) => (
                <div className={`chat ${email === el.author ? 'moveLeft' : ""}`} key={el.time}>
                  <h2>{el.message}</h2>
                  <div className="box">
                    <p>{el.author}</p>
                    <p>{el.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text "
            placeholder="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={joinRoom}>Join room</button>
        </div>
      )}
    </div>
  );
}
