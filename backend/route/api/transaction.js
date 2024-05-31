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
const route = express.Router();

route.post("/rmissue", RMIssueController);
route.put("/issueUpdate", RMIssueStatusUpdateController);
route.put("/issueReject", RMIssueRejectController);
route.post("/dltissueline", DeleteIssueLineController);

route.get("/rmcheck", RMIssueWatingController);
route.post("/rmtnxview", RMIssueDoneController);

route.post("/rmreceive", RMReceiveController);
route.post("/receiveview", ViewReceiveController);
route.post("/receiveupdate", RMReceiveUpdateController);
route.get("/itemwiserec", ViewItemWiseRecController);
route.post("/lotrecview", ViewLotWiseReceController);

module.exports = route;
