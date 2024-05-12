const express = require("express");
const AddItemController = require("../../controllers/AddItemController");
const ViewItemController = require("../../controllers/ViewItemController");
const EditItemController = require("../../controllers/EditItemController");
const AddLotController = require("../../controllers/AddLotController");
const ViewLotController = require("../../controllers/ViewLotController");
const EditLotController = require("../../controllers/EditLotController");
const DeleteLotController = require("../../controllers/DeleteLotController");
const AddBOMController = require("../../controllers/AddBOMController");
const ViewBOMController = require("../../controllers/ViewBOMController");
const route = express.Router();

route.post("/additem", AddItemController);
route.get("/viewitemlist", ViewItemController);
route.put("/edititem", EditItemController);
route.put("/dltitem", EditItemController);

route.post("/addlot", AddLotController);
route.get("/viewLot", ViewLotController);
route.put("/editlot", EditLotController);
route.put("/dltlot", DeleteLotController);

route.post("/addbom", AddBOMController);
route.post("/viewbom", ViewBOMController);

module.exports = route;
