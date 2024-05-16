const Station = require("../model/stationModel");

async function ViewStationController(req, res) {
  const existingStation = await Station.find();
  return res.status(200).send(existingStation);
}

module.exports = ViewStationController;
