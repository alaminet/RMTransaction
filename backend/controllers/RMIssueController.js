const RMIssue = require("../model/rmIssueModel");
const RMIssueController = async (req, res) => {
  const { date, tnxby, station, model, lot, issueList, code, qty, loc, rmk } =
    req.body;

  const lastTnxID = await RMIssue.find({}).sort({ _id: -1 }).limit(1);

  if (lastTnxID.length > 0) {
    const rmissue = await new RMIssue({
      date: new Date(date),
      tnxby: tnxby,
      tnxID: lastTnxID[0].tnxID + 1,
      station: station,
      model: model,
      lot: lot,
      issueList: issueList,
      code: code,
      qty: qty,
      loc: loc,
      rmk: rmk,
    });
    await rmissue.save();
    res.send(rmissue);
  } else {
    const rmissue = await new RMIssue({
      date: date,
      tnxby: tnxby,
      tnxID: 240501,
      station: station,
      model: model,
      lot: lot,
      issueList: issueList,
      code: code,
      qty: qty,
      loc: loc,
      rmk: rmk,
    });
    await rmissue.save();
    res.send(rmissue);
  }
};

module.exports = RMIssueController;
