require("dotenv").config({ path: "../.env" });
 console.log(process.env.DATABASE, process.env.DIALECT," <<<< Log from db.config >>>>");
module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  dialect: process.env.DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};