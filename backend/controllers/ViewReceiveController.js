const Receive = require("../model/rmReceiveModel");

const ViewReceiveController = async (req, res) => {
  const { stDate, edDate } = req.body;

  const receiveList = await Receive.find({
    date: {
      $gte: new Date(stDate),
      $lte: new Date(edDate),
    },
  })
    .populate("receList.codeID")
    .populate("receList.locID")
    .populate("tnxby")
    .populate("lotID");
  return res.status(200).send(receiveList);
};

module.exports = ViewReceiveController;
