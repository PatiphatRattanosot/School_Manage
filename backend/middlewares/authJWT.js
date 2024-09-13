const jwt = require("jsonwebtoken");
const db = require("../models");
const config = require("../config/auth.config");

const Person = db.Person;

//vertify token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]; //x-access-token
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.id = decoded.id;
    next();
  });
};

//Check admin
isAdmin = (req, res, next) => {

  // console.log(req, "body", req.id);

  Person.findByPk(req.id).then((person) => {
    person
      .getRoles()
      .then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      })
      .catch((err) => {
        res.status(500).send({ message: err });
        return;
      });
  });
};
//Check Teacher
isTeacher = (req, res, next) => {
  Person.findByPk(req.id).then((person) => {
    person
      .getRoles()
      .then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "teacher") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Teacher Role!" });
        return;
      })
      .catch((err) => {
        res.status(500).send({ message: err });
        return;
      });
  });
};

//CheckAdminOrTeacher
isAdminOrTeacher = (req, res, next) => {
  Person.findByPk(req.id)
    .then((person) => {
      person.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin" || roles[i].name === "teacher") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin or Teacher Role!" });
        return;
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// //Check Student
// isStudent = (req, res, next) => {
//     Person.findById(req.personId).then((person) => {
//         person.getRoles().then((roles) =>{
//             for (let i = 0; i < roles.length; i++) {
//                 if (roles[i].name === "student") {
//                     next();
//                     return;
//                 }
//             }
//             res.status(403).send({message: "Require Student Role!"});
//             return;
//         })
//         .catch((err) => {
//             res.status(500).send({message: err})
//         })
//     })
// }

const authJwt = {
  verifyToken,
  isAdmin,
  isTeacher,
  // isStudent
  isAdminOrTeacher,
};
module.exports = authJwt;
