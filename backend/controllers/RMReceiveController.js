const RMReceive = require("../model/rmReceiveModel");
const RMReceiveController = async (req, res) => {
  const {
    date,
    LC,
    inv,
    BE,
    PO,
    lot,
    rmk,
    tnxby,
    receList,
    codeID,
    locID,
    order,
    qty,
  } = req.body;

  const lastTnxID = await RMReceive.find({}).sort({ _id: -1 }).limit(1);
  try {
    if (lastTnxID.length > 0) {
      const rmReceive = await new RMReceive({
        date: new Date(date),
        LC: LC,
        tnxID: lastTnxID[0].tnxID + 1,
        tnxby: tnxby,
        inv: inv,
        BE: BE,
        PO: PO,
        lot: lot,
        rmk: rmk,
        receList: receList,
        codeID: codeID,
        qty: qty,
        locID: locID,
        order: order,
      });
      await rmReceive.save();
      res.status(200).send({ rmReceive, message: "Recevie Done !" });
    } else {
      const rmReceive = await new RMReceive({
        date: new Date(date),
        LC: LC,
        tnxID: 19000100,
        tnxby: tnxby,
        inv: inv,
        BE: BE,
        PO: PO,
        lot: lot,
        rmk: rmk,
        receList: receList,
        codeID: codeID,
        qty: qty,
        locID: locID,
        order: order,
      });
      await rmReceive.save();
      res.status(200).send({ rmReceive, message: "Recevie Done !" });
    }
  } catch (error) {
    res.status(401).send({ message: "Receive Not Complete" });
  }
};

module.exports = RMReceiveController;
