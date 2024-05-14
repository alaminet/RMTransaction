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
const ViewBOMLotController = require("../../controllers/ViewBOMLotController");
const AddItemBOMController = require("../../controllers/AddItemBOMController");
const AddLocationController = require("../../controllers/AddLocationModel");
const ViewLocationController = require("../../controllers/ViewLocationController");
const route = express.Router();

route.post("/additem", AddItemController);
route.get("/viewitemlist", ViewItemController);
route.put("/edititem", EditItemController);
route.put("/dltitem", EditItemController);
route.get("/name/:codeID", EditItemController);

route.post("/addlot", AddLotController);
route.get("/viewLot", ViewLotController);
route.put("/editlot", EditLotController);
route.put("/dltlot", DeleteLotController);

route.post("/addbom", AddBOMController);
route.post("/viewbom", ViewBOMController);
route.get("/viewbomlot", ViewBOMLotController);
route.put("/additembom", AddItemBOMController);

route.post("/addlocation", AddLocationController);
route.get("/viewlocation", ViewLocationController);

module.exports = route;
