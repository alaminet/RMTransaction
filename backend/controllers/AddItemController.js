const Item = require("../model/itemModel");

async function AddItemController(req, res) {
  const { itemlist } = req.body;

  const arrlist = [];
  itemlist.map((item) => {
    arrlist.push({ ...item });
  });

  arrlist.map(async (list) => {
    try {
      const codeexit = await Item.find({ code: list[0] });
      if (codeexit.length < 0) {
        const newItem = await new Item({
          code: list[0],
          itemname: list[1],
          uom: list[2],
        });
        await newItem.save();
        res.send("itemAdded");
      }
    } catch (error) {
      console.log(error);
    }
  });
}
module.exports = AddItemController;
