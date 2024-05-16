const Location = require("../model/stationModel");

const EditLocationController = async (req, res) => {
  const { id, data } = req.body;
  try {
    const updateLoc = await Location.findByIdAndUpdate(
      id,
      { $set: { loc: data } },
      { new: true }
    );
    await updateLoc.save();
    res.status(200).send({ updateLoc, message: "Location Name updated" });
  } catch (error) {
    res.status(401).send({ message: "Not edited" });
  }
};

module.exports = EditLocationController;
