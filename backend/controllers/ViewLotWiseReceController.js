const Receive = require("../model/rmReceiveModel");

const ViewLotWiseReceController = async (req, res) => {
  const { lot } = req.body;

  const receiveList = await Receive.find({ lotID: lot })
    .populate("receList.codeID")
    .populate("receList.locID")
    .populate("tnxby")
    .populate("lotID");
  return res.status(200).send(receiveList);
};

module.exports = ViewLotWiseReceController;
