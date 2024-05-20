const RMIssue = require("../model/rmIssueModel");
const RMIssueController = async (req, res) => {
  const { date, tnxby, stationID, lotID, issueList, codeID, lineID, qty, rmk } =
    req.body;

  const lastTnxID = await RMIssue.find({}).sort({ _id: -1 }).limit(1);

  if (lastTnxID.length > 0) {
    const rmissue = await new RMIssue({
      date: new Date(date),
      tnxby: tnxby,
      tnxID: lastTnxID[0].tnxID + 1,
      stationID: stationID,
      lotID: lotID,
      issueList: issueList,
      lineID: lineID,
      codeID: codeID,
      qty: qty,
      rmk: rmk,
    });
    await rmissue.save();
    res.send(rmissue);
  } else {
    const rmissue = await new RMIssue({
      date: date,
      tnxby: tnxby,
      tnxID: 240501,
      stationID: stationID,
      lotID: lotID,
      issueList: issueList,
      lineID: lineID,
      codeID: codeID,
      qty: qty,
      rmk: rmk,
    });
    await rmissue.save();
    res.send(rmissue);
  }
};

module.exports = RMIssueController;
