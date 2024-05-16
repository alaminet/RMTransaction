const Item = require("../model/itemModel");

async function ViewItemController(req, res) {
  const existingItem = await Item.find();
  return res.status(200).send(existingItem);
}

module.exports = ViewItemController;
