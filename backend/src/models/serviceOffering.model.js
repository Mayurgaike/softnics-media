module.exports = (sequelize, DataTypes) => {
  const ServiceOffering = sequelize.define("ServiceOffering", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Services",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return ServiceOffering;
};
