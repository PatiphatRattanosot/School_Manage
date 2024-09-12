const { DataTypes } = require("sequelize");
const sequelize = require("./db.models");

const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Role.sync({ force: false })
  .then(() => {
    console.log("Role Table Created");
    console.log("-----------------------");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });

module.exports = Role;