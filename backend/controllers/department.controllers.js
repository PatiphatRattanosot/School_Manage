const Department = require("../models/department.models");

//Create Department
exports.create = async (req, res) => {
  await Department.findOne({
    where: {
      name: req.body.name,
    },
  }).then((department) => {
    if (department) {
      res.status(400).send({ message: "Department already exists!" });
      return;
    }

    const newDepartment = {
      name: req.body.name,
      description: req.body.description,
    };
    Department.create(newDepartment)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Department.",
        });
      });
  });
};

//Get All
exports.getAll = async (req, res) => {
  await Department.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Department.",
      });
    });
};

//Get By Id
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Department.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: "Department not found! " + id });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while retrieving Department. " + id,
      });
    });
};

// Update Department
exports.update = async (req, res) => {
    const id = req.params.id;
    await Department.update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Department was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Department id = ${id}. Maybe Department was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Department with id=" + id,
      });
    });
};

//Delete Department
exports.delete = async (req, res) => {
    const id = req.params.id;
    await Department.destroy({
      where: { id: id },
    })
    .then((data) => {
        if (data) {
        res.send({
          message: "Department was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Department with id=${id}. Maybe Department was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Department with id=" + id,
      });
    })
}