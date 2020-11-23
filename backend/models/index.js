require("dotenv").config();
const Sequelize = require("sequelize");

const db = {};

//connexion DB
sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
  url: process.env.DEV_DATABASE_URL,
  dialect: "postgres",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//registration models
db.Post = require("./post.js")(sequelize, Sequelize.DataTypes);
db.Comment = require("./comment.js")(sequelize, Sequelize.DataTypes);
db.User = require("./user.js")(sequelize, Sequelize.DataTypes);

//registration associations
db.Post.associate(db);
db.Comment.associate(db);
db.User.associate(db);

module.exports = db;
