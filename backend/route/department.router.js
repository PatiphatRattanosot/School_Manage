const express =require("express");
const router = express.Router();
const DepartmentController = require("../controllers/department.controllers")

// Create a Department
router.post("/", DepartmentController.create);
//Get All
router.get("/", DepartmentController.getAll);
//Get By Id
router.get("/:id", DepartmentController.getById);
//Update Department
router.put("/:id", DepartmentController.update);
//Delete Department
router.delete("/:id", DepartmentController.delete);

module.exports = router;
