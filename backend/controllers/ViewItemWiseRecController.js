const Receive = require("../model/rmReceiveModel");

const ViewItemWiseRecController = async (req, res) => {
  const { lineID } = req.body;

  const receiveList = await Receive.find({ lineID: lineID })
    .populate("receList.codeID")
    .populate("receList.locID")
    .populate("tnxby")
    .populate("lotID");
  return res.status(200).send(receiveList);
};

module.exports = ViewItemWiseRecController;
