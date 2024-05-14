const Location = require("../model/locationModel");

async function ViewLocationController(req, res) {
  const existingLoc = await Location.find();
  return res.status(200).send(existingLoc);
}

module.exports = ViewLocationController;
