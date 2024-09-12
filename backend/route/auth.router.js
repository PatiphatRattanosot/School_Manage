const express =require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controllers")

//Signup
router.post("/signup", AuthController.signup);
//Signin
router.post("/signin", AuthController.signin);

module.exports = router;