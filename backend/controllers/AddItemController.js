const Item = require("../model/itemModel");

async function AddItemController(req, res) {
  const { itemlist } = req.body;
  // sorting new code
  try {
    itemlist?.map(async (item) => {
      const codeExit = [];
      const codeNew = [];
      const existingItem = await Item.find({ code: item.code });
      if (existingItem.length > 0) {
        codeExit.push(item);
      } else {
        codeNew.push(item);
      }
      if (codeNew.length == 0) {
        console.log("No New Item Found");
      } else {
        await Item.insertMany(codeNew);
      }
    });
    res.status(200).send({ message: "Only New Item Added" });
  } catch (error) {
    console.log(error);
  }
}
module.exports = AddItemController;
