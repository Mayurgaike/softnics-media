module.exports = (sequelize, DataTypes) => {
  const ClientDetail = sequelize.define("ClientDetail", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return ClientDetail;
};
