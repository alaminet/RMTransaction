const Lot = require("../model/lotModel");

const EditLotController = async (req, res) => {
  const { id, filed, data } = req.body;
  if (filed === "model") {
    const findItem = await Lot.findByIdAndUpdate(id, { $set: { model: data } });
    await findItem.save();
    res.status(200).send({ findItem, message: "Model updated" });
  }
  if (filed === "lot") {
    const findItem = await Lot.findByIdAndUpdate(id, {
      $set: { lot: data },
    });
    await findItem.save();
    res.status(200).send({ findItem, message: "Lot updated" });
  }
};

module.exports = EditLotController;
