module.exports = (sequelize, DataTypes) => {
  const ClientLink = sequelize.define("ClientLink", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return ClientLink;
};
