const express = require("express");
const RMIssueController = require("../../controllers/RMIssueController");
const RMIssueWatingController = require("../../controllers/RMIssueWatingController");
const RMIssueStatusUpdateController = require("../../controllers/RMIssueStatusUpdateController");
const RMIssueRejectController = require("../../controllers/RMIssueRejectController");
const route = express.Router();

route.post("/rmissue", RMIssueController);
route.put("/issueUpdate", RMIssueStatusUpdateController);
route.put("/issueReject", RMIssueRejectController);

route.get("/rmcheck", RMIssueWatingController);

module.exports = route;
