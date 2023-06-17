const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  Messages: [
    {
      message: String,
      username:String,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("Messages", MessagesSchema);
