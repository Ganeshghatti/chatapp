import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./Login.scss";

export default function Login() {
  const [useremail, setUseremail] = useState("");
  const [userpassword, setuserpassword] = useState("");

  const userdata = {
    email: useremail,
    password: userpassword,
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!useremail || !userpassword) {
      document.getElementsByClassName("error")[0].textContent =
        "Please fill in all the required fields";
    } else {
      try {
        const response = await axios.post("http://localhost:4000/login", {
          userdata,
        });
        console.log("Success:", response.data);

        if (response.status === 200) {
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("currentuserid", response.data._id);
          console.log("successlodin")
          window.location.href = "/Home";
        } else if(response.status === 400){
          document.getElementsByClassName("error")[0].textContent =
            "Email and password do not match";
        }
      } catch (error) {
        console.error("Error:", error);
        document.getElementsByClassName("error")[0].textContent =
          "An error occurred. Please try again later.";
      }
    }
  };

  return (
    <div className="login">
      <form>
        <h1>Welcome</h1>
        <h4>
          New user?<Link to="/" className="signuplink">Signup</Link>
        </h4>
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
          <button onClick={handleClick} className="next-button">
            Next
          </button>
        </Link>
      </form>
    </div>
  );
}
