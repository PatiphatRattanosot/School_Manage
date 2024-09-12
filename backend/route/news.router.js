const express =require("express");
const router = express.Router();
const NewsController = require("../controllers/news.controllers")

// Create a News
router.post("/", NewsController.createNews);
//Get All
router.get("/", NewsController.getAllNews);
//Get By Type
router.post("/type", NewsController.getByType);
//Get By Id
router.get("/:id", NewsController.getById);
//Update News
router.put("/:id", NewsController.updateNews);
//Delete News
router.delete("/:id", NewsController.deleteNews);

module.exports = router;