const RMIssue = require("../model/rmIssueModel");
const RMReceive = require("../model/rmReceiveModel");

const RMIssueStatusUpdateController = async (req, res) => {
  const { issueID, receID, qty } = req.body;

  await RMIssue.findOneAndUpdate(
    { "issueList._id": issueID },
    { $set: { "issueList.$.status": "done" } },
    { new: true }
  )
    .then(async (findTnx) => {
      if (findTnx) {
        const findRec = await RMReceive.findOneAndUpdate(
          { "receList._id": receID },
          { $set: { "receList.$.issue": qty } },
          { new: true }
        );
        res.status(200).send({ findTnx, findRec });
      } else {
        res.status(401).send({ message: "Issue Not Complete" });
      }
    })
    .catch((error) => {
      res.status(401).send(error);
    });
};

module.exports = RMIssueStatusUpdateController;
