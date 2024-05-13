const BOM = require("../model/bomModel");

async function AddBOMController(req, res) {
  const { lot, itemlist, codeID, qty } = req.body;

  const existingBOM = await BOM.find({ lotID: lot });
  if (existingBOM.length > 0) {
    res.status(401).send({ message: "BOM Exist, Use Single input Option" });
  } else {
    const newBOM = await new BOM({
      lotID: lot,
      itemlist: itemlist,
      codeID: codeID,
      qty: qty,
    });
    await newBOM.save();
    res.status(200).send({ newBOM, message: "New BOM Added" });
  }
}
module.exports = AddBOMController;
