const RMIssue = require("../model/rmIssueModel");

const RMIssueRejectController = async (req, res) => {
  const { lineID } = req.body;

  const findTnx = await RMIssue.findOneAndUpdate(
    { "issueList._id": lineID },
    { $set: { "issueList.$.status": "reject" } }
  );
  await findTnx.save();
  res.status(200).send(findTnx);
};

module.exports = RMIssueRejectController;
