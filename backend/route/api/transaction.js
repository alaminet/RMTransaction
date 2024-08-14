const express = require("express");
const RMIssueController = require("../../controllers/RMIssueController");
const RMIssueWatingController = require("../../controllers/RMIssueWatingController");
const RMIssueStatusUpdateController = require("../../controllers/RMIssueStatusUpdateController");
const RMIssueRejectController = require("../../controllers/RMIssueRejectController");
const RMIssueDoneController = require("../../controllers/RMIssueDoneController");
const RMReceiveController = require("../../controllers/RMReceiveController");
const ViewReceiveController = require("../../controllers/ViewReceiveController");
const ViewLotWiseReceController = require("../../controllers/ViewLotWiseReceController");
const ViewItemWiseRecController = require("../../controllers/ViewItemWiseRecController");
const DeleteIssueLineController = require("../../controllers/DeleteIssueLineController");
const RMReceiveUpdateController = require("../../controllers/RMReceiveUpdateController");
const RMIssueQtyUpdateController = require("../../controllers/RMIssueQtyUpdateController");
const ViewPartStockController = require("../../controllers/ViewPartStockController");
const ViewLotStockController = require("../../controllers/ViewLotStockController");
const ViewItemWiseIssueController = require("../../controllers/ViewItemWiseIssueController");
const OnHandStockController = require("../../controllers/OnHandStockController");
const route = express.Router();

route.post("/rmissue", RMIssueController);
route.post("/rmissueqtyupdate", RMIssueQtyUpdateController);
route.put("/issueUpdate", RMIssueStatusUpdateController);
route.put("/issueReject", RMIssueRejectController);
route.post("/dltissueline", DeleteIssueLineController);

route.get("/rmcheck", RMIssueWatingController);
route.post("/rmtnxview", RMIssueDoneController);
route.post("/itemtnxdlts", ViewItemWiseIssueController);

route.post("/rmreceive", RMReceiveController);
route.post("/receiveview", ViewReceiveController);
route.post("/receiveupdate", RMReceiveUpdateController);
route.get("/itemwiserec", ViewItemWiseRecController);
route.post("/lotrecview", ViewLotWiseReceController);
route.get("/onhand", OnHandStockController);

route.post("/partstock", ViewPartStockController);
route.post("/lotstock", ViewLotStockController);

module.exports = route;
