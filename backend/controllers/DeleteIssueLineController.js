const { ObjectId } = require("mongodb");
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
      ).then(async (response) => {
        // console.log(response);
        const findCode = response.issueList[0].codeID;
        const findLot = response.lotID;
        const IssueQty = response.issueList[0].qty;
        const findRece = await RMReceive.findOneAndUpdate(
          {
            lotID: findLot,
            "receList.codeID": findCode,
            "receList.issue": { $gte: IssueQty },
          },
          {
            $inc: { "receList.$.issue": -IssueQty },
          },
          { new: true }
        ).catch((error) => {
          res.status(401).send(error);
        });
        res.status(200).send({ message: "Partial Tnx Deleted" });
      });
    } else {
      await RMIssue.findOneAndDelete({ "issueList._id": id }).then(
        async (response) => {
          // console.log(response);
          const findCode = response.issueList[0].codeID;
          const findLot = response.lotID;
          const IssueQty = response.issueList[0].qty;
          const findRece = await RMReceive.findOneAndUpdate(
            {
              lotID: findLot,
              "receList.codeID": findCode,
              "receList.issue": { $gte: IssueQty },
            },
            {
              $inc: { "receList.$.issue": -IssueQty },
            },
            { new: true }
          ).catch((error) => {
            res.status(401).send(error);
          });
          res.status(200).send({ message: "Full Tnx Deleted" });
        }
      );
    }
  } catch (error) {
    return res.status(401).send({ message: "Not Deleted" });
  }
}

module.exports = DeleteIssueLineController;
