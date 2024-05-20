const RMIssue = require("../model/rmIssueModel");
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
    } else {
      await RMIssue.findOneAndDelete({ "issueList._id": id });
    }
    return res.status(200).send({ message: "Item Deleted" });
  } catch (error) {
    return res.status(401).send({ message: "Not Deleted" });
  }
}

module.exports = DeleteIssueLineController;
