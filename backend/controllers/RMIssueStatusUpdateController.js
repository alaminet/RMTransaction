const RMIssue = require("../model/rmIssueModel");
const RMReceive = require("../model/rmReceiveModel");

const RMIssueStatusUpdateController = async (req, res) => {
  const { issueID, receID, qty } = req.body;
  try {
    const findTnx = await RMIssue.findOneAndUpdate(
      { "issueList._id": issueID },
      { $set: { "issueList.$.status": "done" } },
      { new: true }
    );
    await findTnx.save();
    const findRec = await RMReceive.findOneAndUpdate(
      { "receList._id": receID },
      { $set: { "receList.$.issue": qty } },
      { new: true }
    );
    await findRec.save();
    res.status(200).send({ findTnx, findRec });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = RMIssueStatusUpdateController;
