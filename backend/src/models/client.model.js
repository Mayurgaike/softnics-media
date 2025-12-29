module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define("Client", {
    id: {
      type: DataTypes.STRING, // keep your custom string id
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
    },
    logoHeight: {
      type: DataTypes.STRING,
    },
    logoWidth: {
      type: DataTypes.STRING,
    },
    shortSummary: {
      type: DataTypes.TEXT,
    },
  });

  return Client;
};
