import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Home() {
  const [input, setInput] = useState("");
  const [recData, setRecData] = useState([]);

  const sendMessage = () => {
    socket.emit("sendMessage", input);
    setInput("");
  };

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      console.log(data, "data");
      setRecData((prev) => [...prev, data]);
    });
  }, [socket]);


  return (
    <div>
      <input
        type="text"
        placeholder="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>send </button>
      <div>
        {recData.map((el, index) => (
          <h3 key={index}>{el}</h3>
        ))}
      </div>
    </div>
  );
}
