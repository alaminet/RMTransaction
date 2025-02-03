const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userID: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "checker", "LM", "admin", "guest"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
