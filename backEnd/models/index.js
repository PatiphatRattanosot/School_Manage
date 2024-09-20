const sequelize = require("./db.models");
const Sequelize = require("sequelize");
const News = require("./news.models");
const Person = require("./person.models");
const Role = require("./role.models");
const Department = require("./department.models");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.News = News;
db.Person = Person;
db.Role = Role;
db.Department = Department;

// Define associations
// Many-to-Many: Person - Role
db.Person.belongsToMany(db.Role, { through: "person_roles" });
db.Role.belongsToMany(db.Person, { through: "person_roles" });

// One-to-Many: Department - Person
db.Department.hasMany(db.Person, { foreignKey: 'departmentId' });
db.Person.belongsTo(db.Department, { foreignKey: 'departmentId' });

module.exports = db;
