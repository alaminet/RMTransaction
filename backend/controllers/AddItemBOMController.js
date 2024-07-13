const BOM = require("../model/bomModel");

async function AddItemBOMController(req, res) {
  const { lot, itemlist, codeID, qty } = req.body;
  const existingBOM = await BOM.findOne({ lotID: lot });
  if (!existingBOM) {
    res.status(401).send({ message: "BOM not exist" });
  } else {
    const itemAdd = await BOM.findOneAndUpdate(
      { lotID: lot },
      { $push: { itemlist: itemlist } }
    );
    res.status(200).send({ message: "New Item added on BOM" });
  }
}
module.exports = AddItemBOMController;
