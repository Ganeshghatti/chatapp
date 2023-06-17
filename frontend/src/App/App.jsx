import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.scss";

export default function App() {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const userdata = {
    username: username,
    email: useremail,
    password: userpassword,
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!username || !useremail || !userpassword) {
      document.getElementsByClassName("error")[0].textContent="Please fill in all the required fields";
    } else {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/endpoint",
          { userdata }
        );
        console.log("Success:", response.data);
        setResponseMessage(response.data.message)
        console.log(response.data._id)
        localStorage.setItem("username", username);
        localStorage.setItem("currentuserid",response.data._id)
        console.log("success")
        console.log(responseMessage)
        window.location.href = "/Home";
      } catch (error) {
        console.error("Error:", error);
        document.getElementsByClassName("error")[0].textContent="user exists";
      }
    }
  };

  return (
    <div className="app">
      <form>
        <h1>Welcome</h1>
        <h4>Existing user?<Link to="/Login" className="loginlink">login</Link></h4>
        <input
          type="text"
          name="username"
          required
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          required
          value={useremail}
          placeholder="Email"
          onChange={(e) => setUseremail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          required
          value={userpassword}
          placeholder="Password"
          onChange={(e) => setuserpassword(e.target.value)}
        />
        <p className="error"></p>
        <Link to="/Home">
          <button onClick={handleClick} className="next-button">Next</button>
        </Link>
      </form>
    </div>
  );
}
