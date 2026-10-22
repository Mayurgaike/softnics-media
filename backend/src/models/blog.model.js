module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    "Blog",
    {
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
      content: {
        type: DataTypes.TEXT("long"),
      },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
      },
      author: {
        type: DataTypes.STRING,
      },
      publishedAt: {
        type: DataTypes.DATE,
      },
      metaTitle: {
        type: DataTypes.STRING,
      },
      metaDescription: {
        type: DataTypes.TEXT,
      },
      metaKeywords: {
        type: DataTypes.TEXT,
      },
      ogTitle: {
        type: DataTypes.STRING,
      },
      ogDescription: {
        type: DataTypes.TEXT,
      },
      twitterTitle: {
        type: DataTypes.STRING,
      },
      twitterDescription: {
        type: DataTypes.TEXT,
      },
      schemaCode: {
        type: DataTypes.TEXT("long"),
      },
      canonicalUrl: {
        type: DataTypes.STRING,
      },
      customHeaderCode: {
        type: DataTypes.TEXT("long"),
      },
    },
    {
      paranoid: true,
      timestamps: true,
      tableName: "blogs"
    }
  );

  return Blog;
};
