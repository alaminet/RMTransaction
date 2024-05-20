const User = require("../model/userModel");
const bcrypt = require("bcrypt");

async function ResetPassController(req, res) {
  const { userID } = req.body;
  const newPass = "password";
  const exitingUser = await User.findById(userID);
  if (exitingUser) {
    bcrypt.hash(newPass, 6, async (err, hash) => {
      const upUser = await User.findByIdAndUpdate(
        userID,
        { $set: { password: hash } },
        { new: true }
      );
      res.status(200).send(upUser);
    });
  } else {
    res.status(401).send({
      error: "User Not Valid",
    });
  }
}

module.exports = ResetPassController;
