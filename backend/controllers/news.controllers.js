const News = require("../models/news.models");

//Create new News
exports.createNews = async (req, res) => {
  await News.findOne({
    where: {
      title: req.body.title,
    },
  }).then((news) => {
    if (news) {
      res.status(400).send({ message: "News already exists!" });
      return;
    }
    //create a news
    const newNews = {
      title: req.body.title,
      description: req.body.description,
      newsImage: req.body.newsImage,
      newsType: req.body.newsType,
    };
    News.create(newNews)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the News.",
        });
      });
  });
};

// Get all News
exports.getAllNews = async (req, res) => {
  await News.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving News.",
      });
    });
};

//Get By type
exports.getByType = async (req, res) => {
    
  await News.findAll({
    where: {
      newsType: req.body.newsType,
    },
  })
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send({ message: "News not found! " + type });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving News.",
      });
    });
};

//Get By Id
exports.getById = async (req, res) => {
  const id = req.params.id;
  await News.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: "News not found! " + id });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving News. " + id,
      });
    });
};

//update News
exports.updateNews = async (req, res) => {
  const id = req.params.id;
  await News.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "News was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update News id = ${id}. Maybe News was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating News with id=" + id,
      });
    });
};

//Delete News
exports.deleteNews = async (req, res) => {
  const id = req.params.id;
    await News.destroy({
    where: { id: id },
  })
  .then((num) => {
    if (num == 1) {
        res.send({
          message: "News was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete News with id=${id}. Maybe News was not found!`,
        });
      }
  })
  .catch((err) => {
    res.status(500).send({
      message: "Could not delete News with id=" + id,
    });
  });
};


