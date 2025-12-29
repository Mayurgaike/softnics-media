module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("Service", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    intro: {
      type: DataTypes.TEXT,
    },
    closing: {
      type: DataTypes.TEXT,
    },
  });

  return Service;
};
