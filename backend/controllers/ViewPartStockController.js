const Item = require("../model/itemModel");
const Receive = require("../model/rmReceiveModel");
const Issue = require("../model/rmIssueModel");

const ViewPartStockController = async (req, res) => {
  const { code } = req.body;
  try {
    const itemMatch = await Item.findOne({ code: code });
    if (itemMatch) {
      const receive = await Receive.find({ "receList.codeID": itemMatch._id });
      res.status(200).send({ itemMatch, receive });
    } else {
      res.status(401).send({ message: "Item Not Matched" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = ViewPartStockController;
