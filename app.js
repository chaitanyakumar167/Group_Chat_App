const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors')
require("dotenv").config();

const Sequelize = require("./util/database");

const userRouter = require("./routes/user");

const app = express();

app.use(cors({
  "origin": "http://127.0.0.1:3000",
  "methods": ["POST","GET"]
}))

app.use(bodyParser.json());

app.use("/user", userRouter);

// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, `public/${req.url}`));
// });

Sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
