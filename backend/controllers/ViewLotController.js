const Lot = require("../model/lotModel");

async function ViewLotController(req, res) {
  const existingLot = await Lot.find();
  return res.status(200).send(existingLot);
}

module.exports = ViewLotController;
