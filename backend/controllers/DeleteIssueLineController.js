const RMIssue = require("../model/rmIssueModel");
const RMReceive = require("../model/rmReceiveModel");
async function DeleteIssueLineController(req, res) {
  const { id } = req.body;
  try {
    const ckIssue = await RMIssue.findOne({ "issueList._id": id });
    if (ckIssue.issueList.length > 1) {
      await RMIssue.findOneAndUpdate(
        { "issueList._id": id },
        { $pull: { issueList: { _id: id } } },
        { new: true }
      );
      return res.status(200).send({ message: "Partial Deleted" });
    } else {
      await RMIssue.findOneAndDelete({ "issueList._id": id });
      return res.status(200).send({ message: "Complete Deleted" });
    }
  } catch (error) {
    return res.status(401).send({ message: "Not Deleted" });
  }
}

module.exports = DeleteIssueLineController;
