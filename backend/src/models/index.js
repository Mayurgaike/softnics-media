const sequelize = require("../config/database");
const Sequelize = require("sequelize");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.Service = require("./service.model")(sequelize, Sequelize);
db.ServiceOffering = require("./serviceOffering.model")(sequelize, Sequelize);

db.Client = require("./client.model")(sequelize, Sequelize);
db.ClientDetail = require("./clientDetail.model")(sequelize, Sequelize);
db.ClientLink = require("./clientLink.model")(sequelize, Sequelize);

db.Blog = require("./blog.model")(sequelize, Sequelize);
db.BlogBlock = require("./blogBlock.model")(sequelize, Sequelize);

db.Team = require("./team.model")(sequelize, Sequelize);

// ASSOCIATIONS
db.Service.hasMany(db.ServiceOffering, {
  foreignKey: "serviceId",
  as: "offerings",
  onDelete: "CASCADE",
});

db.ServiceOffering.belongsTo(db.Service, {
  foreignKey: "serviceId",
});

db.Client.hasMany(db.ClientDetail, {
  foreignKey: "clientId",
  as: "details",
  onDelete: "CASCADE",
});

db.ClientDetail.belongsTo(db.Client, {
  foreignKey: "clientId",
});

db.Client.hasMany(db.ClientLink, {
  foreignKey: "clientId",
  as: "links",
  onDelete: "CASCADE",
});

db.ClientLink.belongsTo(db.Client, {
  foreignKey: "clientId",
});

db.Blog.hasMany(db.BlogBlock, {
  foreignKey: "blogId",
  as: "content",
  onDelete: "CASCADE",
});

db.BlogBlock.belongsTo(db.Blog, {
  foreignKey: "blogId",
});

module.exports = db;
