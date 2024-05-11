const Lot = require("../model/lotModel");

async function AddLotController(req, res) {
  const { itemlist } = req.body;
  // sorting new lot
  try {
    itemlist?.map(async (item) => {
      const lotExit = [];
      const lotNew = [];
      const existingItem = await Lot.find({ lot: item.lot });
      if (existingItem.length > 0) {
        lotExit.push(item.lot);
      } else {
        lotNew.push(item);
      }
      if (lotNew.length == 0) {
        console.log("New Lot Not Found");
      } else {
        await Lot.insertMany(lotNew);
      }
    });
    res.status(200).send({ message: "Only New Lot Added" });
  } catch (error) {
    console.log(error);
  }
}
module.exports = AddLotController;
