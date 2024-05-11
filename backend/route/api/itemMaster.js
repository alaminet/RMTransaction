const express = require("express");
const AddItemController = require("../../controllers/AddItemController");
const ViewItemController = require("../../controllers/ViewItemController");
const EditItemController = require("../../controllers/EditItemController");
const AddLotController = require("../../controllers/AddLotController");
const ViewLotController = require("../../controllers/ViewLotController");
const EditLotController = require("../../controllers/EditLotController");
const route = express.Router();

route.post("/additem", AddItemController);
route.get("/viewitemlist", ViewItemController);
route.put("/edititem", EditItemController);
route.put("/dltitem", EditItemController);

route.post("/addlot", AddLotController);
route.get("/viewLot", ViewLotController);
route.put("/editlot", EditLotController);

module.exports = route;
