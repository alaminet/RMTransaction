const Station = require("../model/stationModel");
async function DeleteStationController(req, res) {
  const { id } = req.body;
  try {
    await Station.findByIdAndDelete(id);
    return res.status(200).send({ message: "Station Deleted" });
  } catch (error) {
    return res.status(401).send({ message: "Not able to Delete" });
  }
}

module.exports = DeleteStationController;
