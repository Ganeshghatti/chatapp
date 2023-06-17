import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.scss";
// import profile from "../Assets/profile_photo-removebg-preview.png";
import io from "socket.io-client";
import send from "../Assets/sendbutton.png";
// import options from "../Assets/options bg.png";
import Messagetemp from "../Messagetemp/Messagetemp";
import ScrollToBottom from "react-scroll-to-bottom";

const socket = io.connect("http://localhost:4000");

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const currentUserId = localStorage.getItem("currentuserid");
  const username = localStorage.getItem("username");
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (message) {
      await socket.emit("send_message", { message });
      const updatedMessages = [...messages, { message, sender: currentUserId }];
      setMessages(updatedMessages);
      setMessage("");
      try {
        await axios.post("http://localhost:4000/message", {
          message,
          sender: currentUserId,
          username: username,
        });
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const updatedMessages = [...messages, { message: data.message }];
      setMessages(updatedMessages);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:4000/message");
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="home">
      <div className="container">
        <section className="head">
          <Link to="/login">
            <button className="logoutbtn" type="button">
              {" "}
              logout
            </button>
          </Link>
        </section>
        <ScrollToBottom className="textmessage">
          <Messagetemp currentUserId={currentUserId} messages={messages} />
        </ScrollToBottom>
        <section className="foot">
          <input
            className="entertext"
            type="text"
            name="message"
            value={message}
            placeholder="Enter message"
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress} // Add this line
            autoFocus
          />
          <img src={send} alt="" onClick={sendMessage} />
        </section>
      </div>
    </div>
  );
}
