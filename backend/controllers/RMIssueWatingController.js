const RMIssue = require("../model/rmIssueModel");

const RMIssueWatingController = async (req, res) => {
  const tnxWaitingList = await RMIssue.find({ "issueList.status": "waiting" });
  res.send(tnxWaitingList);
};

module.exports = RMIssueWatingController;
