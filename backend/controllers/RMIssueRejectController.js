const RMIssue = require("../model/rmIssueModel");

const RMIssueRejectController = async (req, res) => {
  const { lineID, updateBy } = req.body;

  try {
    const findTnx = await RMIssue.findOneAndUpdate(
      { "issueList._id": lineID },
      {
        $set: {
          "issueList.$.status": "reject",
          "issueList.$.updateTime": new Date(),
          "issueList.$.updateBy": updateBy,
        },
      }
    );
    await findTnx.save();
    res.status(200).send(findTnx);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = RMIssueRejectController;
