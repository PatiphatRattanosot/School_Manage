const { DataTypes } = require("sequelize");
const sequelize = require("./db.models");

const Person = sequelize.define("person", {
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ImageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prefix: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  departmentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'departments', 
      key: 'id',
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Person.sync({ force: false })
  .then(() => {
    console.log("Person Table Created");
    console.log("-----------------------");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });

module.exports = Person;
