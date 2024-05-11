const Item = require("../model/itemModel");
async function DeleteItemController(req, res) {
  const { id } = req.body;
  try {
    const dltUser = await Item.findByIdAndDelete(id);
    return res.status(200).send({ message: "Item Deleted" });
  } catch (error) {
    return res.status(401).send({ message: "Not Deleted" });
  }
}

module.exports = DeleteItemController;
