const express =require("express");
const router = express.Router();
const PersonController = require("../controllers/person.controlles")
const { authJwt } = require("../middlewares/index");

//GetById
router.get("/:id", PersonController.getById);
//GetAll
router.get("/", PersonController.getAll);
//getPersonByDepartmentAndRole
router.post("/department", PersonController.getPersonByDepartmentAndRole);
//Get By Role
router.post("/role", PersonController.getByRole);
//Update Profile
router.put("/:id",[authJwt.verifyToken], PersonController.updateProfile);
//Delete
router.delete("/:id",[authJwt.verifyToken, authJwt.isAdmin], PersonController.delete);

module.exports = router;