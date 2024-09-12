const { DataTypes } = require("sequelize");
const sequelize = require("./db.models");

const Department = sequelize.define("department", {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
});

Department.sync({ force: false })
  .then(() => {
    
    console.log("Department Table Created");
    console.log("-----------------------");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });

module.exports = Department;