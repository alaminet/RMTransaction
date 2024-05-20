const User = require("../model/userModel");
const bcrypt = require("bcrypt");

async function ChangeUserPassController(req, res) {
  const { userID, oldPass, newPass } = req.body;
  const exitingUser = await User.findById(userID);
  if (exitingUser) {
    bcrypt.compare(oldPass, exitingUser.password, function (err, result) {
      if (result) {
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
          error: "Password not matched",
        });
      }
    });
  } else {
    res.status(401).send({
      error: "Please Contact your HOD",
    });
  }
}

module.exports = ChangeUserPassController;
