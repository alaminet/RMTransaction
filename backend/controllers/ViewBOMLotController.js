const BOM = require("../model/bomModel");

async function ViewBOMLotController(req, res) {
  try {
    const existingBOMLot = await BOM.find().populate("lotID");
    return res.status(200).send(existingBOMLot[0].lotID);
  } catch (error) {
    res.status(401).send(error);
  }
}

module.exports = ViewBOMLotController;
