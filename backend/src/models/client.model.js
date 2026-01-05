module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Client",
    {
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
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
};
