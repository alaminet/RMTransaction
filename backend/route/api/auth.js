const express = require("express");
const AddUserController = require("../../controllers/AddUserController");
const ViewUserController = require("../../controllers/ViewUserController");
const DeleteUserController = require("../../controllers/DeleteUserController");
const EditUserController = require("../../controllers/EditUserController");
const LogginController = require("../../controllers/LogginController");
const ChangeUserPassController = require("../../controllers/ChangeUserPassController");
const ResetPassController = require("../../controllers/ResetPassController");
const route = express.Router();

route.post("/adduser", AddUserController);
route.post("/login", LogginController);
route.get("/viewuser", ViewUserController);
route.put("/dltuser", DeleteUserController);
route.put("/edituser", EditUserController);
route.post("/passchange", ChangeUserPassController);
route.post("/resetpass", ResetPassController);

module.exports = route;
