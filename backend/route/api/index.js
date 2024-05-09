const express = require("express");
const route = express.Router();
const auth = require("./auth");
const transaction = require("./transaction");
const item = require("./itemMaster");

route.use("/auth", auth);
route.use("/tnx", transaction);
route.use("/item", item);

module.exports = route;
