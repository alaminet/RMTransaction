const Receive = require("../model/rmReceiveModel");

const OnHandStockController = async (req, res) => {
  try {
    const receive = await Receive.find()
      .populate("receList.locID")
      .populate("receList.codeID")
      .populate("lotID");
    res.status(200).send(receive);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = OnHandStockController;
