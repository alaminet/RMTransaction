const Item = require("../model/itemModel");

const EditItemController = async (req, res) => {
  const { id, filed, data } = req.body;
  if (filed === "code") {
    const findItem = await Item.findByIdAndUpdate(id, { $set: { code: data } });
    await findItem.save();
    res.status(200).send({ findItem, message: "Part Code updated" });
  }
  if (filed === "itemname") {
    const findItem = await Item.findByIdAndUpdate(id, {
      $set: { itemname: data },
    });
    await findItem.save();
    res.status(200).send({ findItem, message: "Part Name updated" });
  }
  if (filed === "uom") {
    const findItem = await Item.findByIdAndUpdate(id, {
      $set: { uom: data },
    });
    await findItem.save();
    res.status(200).send({ findItem, message: "Part UOM updated" });
  }
};

module.exports = EditItemController;
