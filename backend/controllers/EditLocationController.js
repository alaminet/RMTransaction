const Location = require("../model/locationModel");

const EditLocationController = async (req, res) => {
  const { id, data } = req.body;
  try {
    const updateLoc = await Location.findByIdAndUpdate(
      id,
      { $set: { loc: data } },
      { new: true }
    );
    console.log(updateLoc);
    res.status(200).send({ updateLoc, message: "Location Name updated" });
  } catch (error) {
    console.log(error);

    res.status(401).send({ message: "Not edited" });
  }
};

module.exports = EditLocationController;
