const Station = require("../model/stationModel");

const EditStationController = async (req, res) => {
  const { id, data } = req.body;
  try {
    const updateStation = await Station.findByIdAndUpdate(
      id,
      { $set: { station: data } },
      { new: true }
    );
    await updateStation.save();
    res.status(200).send({ updateStation, message: "Station Name updated" });
  } catch (error) {
    res.status(401).send({ message: "Not edited" });
  }
};

module.exports = EditStationController;
