const RMReceive = require("../model/rmReceiveModel");
const Location = require("../model/locationModel");
const RMReceiveUpdateController = async (req, res) => {
  const { id, field, value } = req.body;

  try {
    if (field == "locID") {
      const findloc = await Location.findOne({ loc: value });
      if (findloc) {
        await RMReceive.findOneAndUpdate(
          { "receList._id": id },
          { $set: { "receList.$.locID": findloc._id } },
          { new: true }
        );
        res.status(200).send({ message: "Location Updated" });
      } else {
        res.status(401).send({ message: "Location Not Found" });
      }
    }
    if (field == "issue") {
      await RMReceive.findOneAndUpdate(
        { "receList._id": id },
        { $set: { "receList.$.issue": value } },
        { new: true }
      );
      res.status(200).send({ message: "Issue Qty Updated" });
    } else {
      res.status(401).send({ message: "Issue Not Found" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = RMReceiveUpdateController;
