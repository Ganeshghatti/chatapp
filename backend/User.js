const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");
const http = require("http");
const { Server } = require("socket.io");
const Messages = require("./model/Messages");

const app = express();

app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const port = 4000;
mongoose.connect("mongodb://127.0.0.1:27017/database");

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data.message);
    socket.broadcast.emit("receive_message", data);
  });
});

app.post("/login", async (req, res) => {
  const userdata = req.body.userdata;
  try {
    const existingUser = await User.findOne({
      email: userdata.email,
      password: userdata.password,
    });
    if (existingUser) {
      return res.status(200).json(existingUser);
    } else {
      return res
        .status(400)
        .json({ message: "Email and password do not match" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to create user" });
  }
});

app.post("/api/endpoint", async (req, res) => {
  const userdata = req.body.userdata;
  try {
    const existingUser = await User.findOne({ email: userdata.email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      username: userdata.username,
      email: userdata.email,
      password: userdata.password,
    });
    await newUser.save();
    const currentuser = newUser;
    return res.status(200).json(currentuser);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create user" });
  }
});

app.get("/message", async (req, res) => {
  try {
    const existingMessages = await Messages.findOne();
    if (existingMessages) {
      return res.status(200).json({
        message: "Messages retrieved successfully",
        messages: existingMessages.Messages,
      });
    } else {
      return res.status(404).json({ message: "No messages found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving messages" });
  }
});

app.post("/message", async (req, res) => {
  const { message, sender ,username } = req.body;
  console.log("Received message:", message);

  try {
    const newMessage = {
      message: message,
      sender: sender,
      username:username,
    };
    console.log("New Message:", newMessage);

    let existingMessages = await Messages.findOne();

    if (!existingMessages) {
      existingMessages = new Messages({ Messages: [] });
    }

    existingMessages.Messages.push(newMessage);
    console.log("Updated Messages:", existingMessages);

    await existingMessages.save();
    console.log("Saved Messages:", existingMessages);

    return res.status(200).json({
      message: "Message added to array successfully",
      existingMessages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding message to array" });
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
