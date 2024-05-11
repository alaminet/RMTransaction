const express = require("express");
const AddItemController = require("../../controllers/AddItemController");
const ViewItemController = require("../../controllers/ViewItemController");
const EditItemController = require("../../controllers/EditItemController");
const route = express.Router();

route.post("/additem", AddItemController);
route.get("/viewitemlist", ViewItemController);
route.put("/edititem", EditItemController);
route.put("/dltitem", EditItemController);

module.exports = route;
