const User = require("../model/userModel");
const bcrypt = require("bcrypt");

async function AddUserController(req, res) {
  const { userID, password, role } = req.body;
  const existingUser = await User.find({ userID: userID });
  if (existingUser.length > 0) {
    return res.status(401).send({ massage: "User Already created." });
  } else {
    bcrypt.hash(password, 6, async (err, hash) => {
      const newUser = await new User({
        userID: userID,
        password: hash,
        role: role,
      });
      await newUser.save();
      res.status(200).send({ newUser, massage: "User Added" });
    });
  }
}

module.exports = AddUserController;
