import React from "react";
import "./Messagetemp.scss";
import ScrollToBottom from "react-scroll-to-bottom";

const Messagetemp = ({ currentUserId, messages }) => {
  return (
    <ScrollToBottom className="Messagetemp">
      {messages.map((message, index) => (
        <p
          key={index}
          className={`text ${
            currentUserId === message.sender ? "right" : "left"
          }`}
        >
          {currentUserId === message.sender ? (
            <span className="username"></span>
          ) : (
            <span className={`username color-${index % 3}`}>{message.username}</span>
          )}
          <span className="messagetext">{message.message}</span>
        </p>
      ))}
    </ScrollToBottom>
  );
};

export default Messagetemp;
