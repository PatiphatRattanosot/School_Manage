const Person = require("../models/person.models");
const Role = require("../models/role.models");
const { Op } = require("sequelize");

//CheckDuplicateEmail
checkDuplicateEmail = async (req, res, next) => {
  await Person.findOne({
    where: {
      email: req.body.email,
    },
  }).then((person) => {
    if (person) {
      res.status(400).send({ message: "Email already exists!" });
      return;
    }
    next();
  });
};

//check roles are valid
checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    await Role.findAll({
      where: {
        name: {
          [Op.or]: req.body.roles,
        },
      },
    }).then((roles) => {
      if (roles.length != req.body.roles.length) {
        res.status(400).send({ message: "Failed! Role does not exist!" });
        return;
      }
      next();
    });
  } else {
    next();
  }
};

const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;