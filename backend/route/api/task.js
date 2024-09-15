const express = require("express");
const TaskNewController = require("../../controllers/TaskNewController");
const TaskViewAllController = require("../../controllers/TaskViewAllController");
const TaskNewChatController = require("../../controllers/TaskNewChatController");
const TaskViewSingleController = require("../../controllers/TaskViewSingleController");
const TaskTeamViewController = require("../../controllers/TaskTeamViewController");
const route = express.Router();

route.post("/newtask", TaskNewController);
route.get("/alltask", TaskViewAllController);
route.get("/taskview", TaskViewSingleController);
route.post("/teamview", TaskTeamViewController);
route.post("/newchat", TaskNewChatController);

module.exports = route;
