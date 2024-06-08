const RMIssue = require("../model/rmIssueModel");

const ViewItemWiseIssueController = async (req, res) => {
  const { stDate, edDate, codeID } = req.body;
  const tnxDonelist = await RMIssue.find({
    date: {
      $gte: stDate,
      $lte: edDate,
    },
    "issueList.codeID": codeID,
  })
    .populate("issueList.codeID")
    .populate("stationID")
    .populate("tnxby")
    .populate("lotID");
  return res.status(200).send(tnxDonelist);
};

module.exports = ViewItemWiseIssueController;
