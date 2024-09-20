const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const cors = require("cors");
//import route
const NewsRouter = require("./route/news.router");
const DepartmentRouter = require("./route/department.router");
const PersonRouter = require("./route/person.router");
const AuthRouter = require("./route/auth.router");
//import model
const db = require("./models/index");


const corsOptions = {
  origin: FRONTEND_URL,
};

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and sync DB");
//   initRole();
// });

const initRole = () => {
    const role = db.Role;
    role.create({
      id: 1,
      name: "admin",
    });
    role.create({
      id: 2,
      name: "teacher",
    });
    role.create({
      id: 3,
      name: "student",
    });
  };
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route
app.use("/api/v1/news", NewsRouter);
app.use("/api/v1/department", DepartmentRouter);
app.use("/api/v1/person", PersonRouter);
app.use("/api/v1/auth", AuthRouter);

//Home

app.get("/", (req, res) => {
  res.send("<h1>School Manage API</h1>");
});


app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
