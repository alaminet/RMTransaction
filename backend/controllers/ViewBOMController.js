const BOM = require("../model/bomModel");

async function ViewBOMController(req, res) {
  const { lot } = req.body;
  const existingBOM = await BOM.find({ lotID: lot })
    .populate("lotID")
    .populate("itemlist.codeID");
  return res.status(200).send(existingBOM);
}

module.exports = ViewBOMController;
