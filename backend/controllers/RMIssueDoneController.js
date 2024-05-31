const RMIssue = require("../model/rmIssueModel");

const RMIssueDoneController = async (req, res) => {
  const { stDate, edDate } = req.body;
  // console.log(edDate);
  const tnxDonelist = await RMIssue.find({
    date: {
      $gte: stDate,
      $lte: edDate,
    },
  })
    .populate("issueList.codeID")
    .populate("stationID")
    .populate("tnxby")
    .populate("lotID");
  return res.status(200).send(tnxDonelist);
};

module.exports = RMIssueDoneController;
