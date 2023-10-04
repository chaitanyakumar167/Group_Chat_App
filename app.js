const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const Sequelize = require("./util/database");
const User = require("./models/user");
const Messages = require("./models/chat");
const Group = require("./models/group");
const UserGroup = require("./models/usergroup");

const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
  })
);

app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/chat", chatRouter);

User.hasMany(Messages, {onDelete:"CASCADE"});
Messages.belongsTo(User);

Group.hasMany(Messages);
Messages.belongsTo(Group);

User.hasMany(UserGroup);
UserGroup.belongsTo(User)

Group.hasMany(UserGroup);
UserGroup.belongsTo(Group)

Sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
