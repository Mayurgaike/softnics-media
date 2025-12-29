const { Team } = require("../models");
const team = require("./data/team");

module.exports = async () => {
  await Team.bulkCreate(team);
};
