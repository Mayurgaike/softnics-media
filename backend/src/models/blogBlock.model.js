module.exports = (sequelize, DataTypes) => {
  const BlogBlock = sequelize.define(
    "BlogBlock",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("heading", "subheading", "paragraph", "list"),
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
      },
      items: {
        type: DataTypes.JSON, // ONLY for list blocks
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );

  return BlogBlock;
};
