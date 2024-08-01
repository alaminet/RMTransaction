const RMIssue = require("../model/rmIssueModel");
const RMReceive = require("../model/rmReceiveModel");

const RMIssueStatusUpdateController = async (req, res) => {
  const { issueID, receID, qty, updateBy } = req.body;

  try {
    const issueStatus = await RMIssue.findOne({
      "issueList._id": issueID,
      "issueList.status": "waiting",
    });
    if (issueStatus) {
      await RMIssue.findOneAndUpdate(
        { "issueList._id": issueID },
        {
          $set: {
            "issueList.$.status": "done",
            "issueList.$.updateTime": new Date(),
            "issueList.$.updateBy": updateBy,
          },
        },
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
    } else {
      res.status(401).send({ message: "Refresh Your List" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = RMIssueStatusUpdateController;
