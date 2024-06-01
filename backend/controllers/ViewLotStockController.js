const Receive = require("../model/rmReceiveModel");

const ViewLotStockController = async (req, res) => {
  const { lot } = req.body;

  try {
    const receive = await Receive.find({
      lotID: lot,
    })
      .populate("receList.locID")
      .populate("receList.codeID")
      .populate("lotID");
    res.status(200).send(receive);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = ViewLotStockController;
