const express = require("express");
const route = express.Router();
const auth = require("./auth");
const transaction = require("./transaction");

route.use("/auth", auth);
route.use("/tnx", transaction);

module.exports = route;
