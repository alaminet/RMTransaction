const Item = require("../model/itemModel");

async function ViewItemController(req, res) {
  const existingUser = await Item.find();
  return res.status(200).send(existingUser);
}

module.exports = ViewItemController;
