// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import profile from "../Assets/profile_photo-removebg-preview.png";
// import send from "../Assets/sendbutton-removebg-preview.png";
// import "./Message.scss";
// import options from "../Assets/options bg.png";
// import Messagetemp from "../Messagetemp/Messagetemp";
// import io from "socket.io-client";

// const socket = io.connect("http://localhost:4000");

// export default function Message() {
//   const { userId } = useParams();
//   const [chattingwith, setchattingwith] = useState([]);
//   const [message, setmessage] = useState("");
//   const [messages, setmessages] = useState([]);
//   const currentuserid = localStorage.getItem("currentuserid");
//   const chattingwithid = localStorage.getItem("chattingwithid");

//   useEffect(() => {
//     fetchchattingwithData();
//   }, []);

//   const fetchchattingwithData = async () => {
//     try {
//       const response = await axios.post("http://localhost:4000/chat", {
//         userId: userId,
//       });
//       setchattingwith(response.data);
//       console.log(response.data._id);
//       localStorage.setItem("chattingwithid", response.data._id);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };



//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       const updatedMessages = [
//         ...messages,
//         { message: data.message},
//       ];
//       setmessages(updatedMessages);
//     });
//     return () => {
//       socket.off("receive_message");
//     };
//   }, [socket, messages]);

//   useEffect(() => {
//     const sendMessagesToBackend = async () => {
//       try {
//         const response = await axios.post("http://localhost:4000/message", {
//           messages: messages,
//           currentuserid:currentuserid,
//         });
//         console.log("Success:", response.data.message);
//       } catch (error) {
//         console.error("Error:", error.message);
//       }
//     };

//     sendMessagesToBackend();
//   }, [messages]);

//   return (
//     <div className="message">
//       <div className="container">
//         <section className="head">
//           <div>
//             <img src={profile} alt="" className="profile" />
//             <div>
//               <p>chating with</p>
//               <p>{chattingwith.username}</p>
//             </div>
//           </div>
//           <img src={options} alt="" className="options" />
//         </section>
//         <section className="textmessage">
//           <Messagetemp messages={messages} currentUserId={currentuserid} />
//         </section>
//         <section className="foot">
//           <input
//             type="text"
//             name="message"
//             value={message}
//             placeholder="Enter message"
//             onChange={(e) => setmessage(e.target.value)}
//           />
//           <button type="submit">
//             <img src={send} alt="" onClick={sendf} />
//           </button>
//         </section>
//       </div>
//     </div>
//   );
// }
import React from 'react'

function Message() {
  return (
    <div>
      
    </div>
  )
}

export default Message
