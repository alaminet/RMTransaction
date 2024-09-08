const express = require("express");
const route = express.Router();
const auth = require("./auth");
const transaction = require("./transaction");
const item = require("./itemMaster");
const task = require("./task");

route.use("/auth", auth);
route.use("/tnx", transaction);
route.use("/item", item);
route.use("/task", task);

module.exports = route;
