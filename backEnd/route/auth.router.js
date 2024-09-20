const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controllers");
const { verifySignUp } = require("../middlewares");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

//Signup
router.post(
  "/signup",
  [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
  AuthController.signup
);
//Signin
router.post("/signin", AuthController.signin);

module.exports = router;
