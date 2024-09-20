const express = require("express");
const router = express.Router();
const DepartmentController = require("../controllers/department.controllers");
const { authJwt } = require("../middlewares/index");

// Create a Department
router.post("/", DepartmentController.create);
//Get All
router.get("/", DepartmentController.getAll);
//Get By Id
router.get("/:id", [authJwt.verifyToken], DepartmentController.getById);
//Update Department
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  DepartmentController.update
);
//Delete Department
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  DepartmentController.delete
);

module.exports = router;
