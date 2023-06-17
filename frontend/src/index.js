import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { BrowserRouter ,Routes, Route  } from "react-router-dom";
import Home from './Home/Home'
import Message from './Message/Message'
import Login from "./Login/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Message/:userId" element={<Message />} />
    </Routes>
  </BrowserRouter>
);
