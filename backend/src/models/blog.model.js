module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
    readTime: {
      type: DataTypes.STRING,
    },
    shortDesc: {
      type: DataTypes.TEXT,
    },
  });

  return Blog;
};
