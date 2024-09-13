const config = require("../config/auth.config");
const db = require("../models");
const Role = db.Role;
const Person = db.Person;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

//Register
exports.signup = async (req, res) => {
  const newPerson = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    ImageUrl: req.body.ImageUrl,
    prefix: req.body.prefix,
    departmentId: req.body.departmentId,
    password: bcrypt.hashSync(req.body.password, 11),
  };
  console.log(newPerson);
  
  await Person.create(newPerson)
    .then((person) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          person.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        //set defautl rple to "person" id=3
        person.setRoles([3]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while creating the Person.",
        });
    });
};

//SignIn
exports.signin = async (req, res) => {
  await Person.findOne({
    where: {
      email: req.body.email,
    },
  }).then((person) => {
    if (!person) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      person.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: person.Id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    //add role
    const authorities = [];
    person.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_"+roles[i].name.toUpperCase());
      }
      
      res.status(200).send({
        id: person.Id,
        firstname: person.firstname,
        lastname: person.lastname,
        email: person.email,
        phone: person.phone,
        ImageUrl: person.ImageUrl,
        prefix: person.prefix,
        departmentId: person.departmentId,
        roles: authorities,
        accessToken: token,
      });
    });
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });
};
