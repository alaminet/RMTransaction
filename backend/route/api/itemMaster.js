const express = require("express");
const AddItemController = require("../../controllers/AddItemController");
const route = express.Router();

route.post("/additem", AddItemController);

module.exports = route;
