const User = require("../model/userModel");

async function ViewUserController(req, res) {
  const existingUser = await User.find();
  return res.status(200).send(existingUser);
}

module.exports = ViewUserController;
