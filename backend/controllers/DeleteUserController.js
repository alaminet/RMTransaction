const User = require("../model/userModel");
async function DeleteUserController(req, res) {
  const { userID } = req.body;
  try {
    const dltUser = await User.findByIdAndDelete(userID);
    return res.status(200).send({ message: "User Deleted" });
  } catch (error) {
    return res.status(401).send({ message: "Not Deleted" });
  }
}

module.exports = DeleteUserController;
