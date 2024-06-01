const RMIssue = require("../model/rmIssueModel");

const RMIssueQtyUpdateController = async (req, res) => {
  const { id, value } = req.body;

  try {
    const update = await RMIssue.findOneAndUpdate(
      { "issueList._id": id },
      { $set: { "issueList.$.qty": value } }
    );
    await update.save();
    res.status(200).send({ update, message: "Issue Qty Updated" });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = RMIssueQtyUpdateController;
