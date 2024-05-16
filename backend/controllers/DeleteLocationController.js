const Location = require("../model/locationModel");
async function DeleteLocationController(req, res) {
  const { id } = req.body;
  try {
    await Location.findByIdAndDelete(id);
    return res.status(200).send({ message: "Location Deleted" });
  } catch (error) {
    return res.status(401).send({ message: "Not able to Delete" });
  }
}

module.exports = DeleteLocationController;
