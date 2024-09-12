const express =require("express");
const router = express.Router();
const PersonController = require("../controllers/person.controlles")
//GetAll
router.get("/", PersonController.getAll);
//Get By Department
router.post("/department", PersonController.getByDepartment);
//Get By Role
router.post("/", PersonController.getByRole);
//Update Profile
router.put("/:id", PersonController.updateProfile);
//Delete
router.delete("/:id", PersonController.delete);

module.exports = router;