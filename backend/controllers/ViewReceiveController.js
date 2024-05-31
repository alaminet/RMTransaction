const Receive = require("../model/rmReceiveModel");

const ViewReceiveController = async (req, res) => {
  const { stDate, edDate } = req.body;
  try {
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
    res.status(200).send(receiveList);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = ViewReceiveController;
