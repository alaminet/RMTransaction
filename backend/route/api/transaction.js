const express = require("express");
const RMIssueController = require("../../controllers/RMIssueController");
const route = express.Router();

route.post("/rmissue", RMIssueController);

module.exports = route;