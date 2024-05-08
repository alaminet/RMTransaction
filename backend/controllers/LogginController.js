const User = require("../model/userModel");
const bcrypt = require("bcrypt");

async function LogginController(req, res) {
  const { userID, password } = req.body;
  const exitingUser = await User.find({ userID: userID });
  if (exitingUser.length > 0) {
    bcrypt.compare(password, exitingUser[0].password, function (err, result) {
      if (result) {
        return res.status(200).send(exitingUser[0]);
      } else {
        return res.status(401).send({
          error: "Password not matched",
        });
      }
    });
  } else {
    return res.status(401).send({
      error: "Please Contact your HOD",
    });
  }
}

module.exports = LogginController;
