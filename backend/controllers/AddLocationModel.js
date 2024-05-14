const Location = require("../model/locationModel");

async function AddLocationController(req, res) {
  const { itemlist } = req.body;
  try {
    const addLoc = await Location.insertMany(itemlist);
    res.status(200).send({ addLoc, message: "New Location Added" });
  } catch (error) {
    res.status(401).send({ message: "Location Not added" });
  }
  // sorting new lot
}
module.exports = AddLocationController;
