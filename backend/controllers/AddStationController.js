const Station = require("../model/stationModel");

async function addStationController(req, res) {
  const { itemlist } = req.body;
  try {
    const addStation = await Station.insertMany(itemlist);
    res.status(200).send({ addStation, message: "New Station Added" });
  } catch (error) {
    res.status(401).send({ message: "Station Not added" });
  }
}
module.exports = addStationController;
