const Item = require("../model/itemModel");

async function AddItemController(req, res) {
  const { itemlist } = req.body;
  // sorting new code
  try {
    await Item.insertMany(itemlist);
    res.status(200).send({ message: "Only New Item Added" });
  } catch (error) {
    res.status(401).send(error);
  }
}
module.exports = AddItemController;
