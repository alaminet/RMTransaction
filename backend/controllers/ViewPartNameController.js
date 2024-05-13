const Item = require("../model/itemModel");

async function ViewPartNameController(req, res) {
  const { codeID } = req.params;
  const item = await Item.findById(codeID);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  } else {
    res.json({ name: item.itemname });
  }
}

module.exports = ViewPartNameController;
