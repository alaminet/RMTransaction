const Lot = require("../model/lotModel");
async function DeleteLotController(req, res) {
  const { id } = req.body;
  try {
    const dltLot = await Lot.findByIdAndDelete(id);
    return res.status(200).send({ message: "Item Deleted" });
  } catch (error) {
    return res.status(401).send({ message: "Not Deleted" });
  }
}

module.exports = DeleteLotController;
