const express = require("express");
const TaskNewController = require("../../controllers/TaskNewController");
const route = express.Router();

route.post("/newtask", TaskNewController);

module.exports = route;
