const User = require("../model/userModel");
async function EditUserController(req, res) {
  const { userID, role } = req.body;
  try {
    const roleUpd = await User.findByIdAndUpdate(userID, {
      $set: { role: role },
    });
    await roleUpd.save();
    res.status(200).send({ findTnx, message: "User Role updated" });
  } catch (error) {
    return res.status(401).send({ message: "Not updated" });
  }
}

module.exports = EditUserController;
