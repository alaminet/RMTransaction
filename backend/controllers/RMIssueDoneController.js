const RMIssue = require("../model/rmIssueModel");

const RMIssueDoneController = async (req, res) => {
  const { stDate, edDate } = req.body;

  const tnxDonelist = await RMIssue.find({
    date: {
      $gte: new Date(stDate),
      $lte: new Date(edDate),
    },
  });
  return res.status(200).send(tnxDonelist);
};

module.exports = RMIssueDoneController;
