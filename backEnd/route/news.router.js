const express = require("express");
const router = express.Router();
const NewsController = require("../controllers/news.controllers");
const { authJwt } = require("../middlewares/index");

// Create a News
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  NewsController.createNews
);
//Get All
router.get("/", NewsController.getAllNews);
//Get By Type
router.post("/type", NewsController.getByType);
//Get By Id
router.get("/:id", NewsController.getById);
//Update News
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isTeacher],
  NewsController.updateNews
);
//Delete News
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdminOrTeacher],
  NewsController.deleteNews
);

module.exports = router;
