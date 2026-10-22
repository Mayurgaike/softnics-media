module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
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
      content: {
        type: DataTypes.TEXT("long"),
      },
      image: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("draft", "published"),
        allowNull: false,
        defaultValue: "draft",
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
      tableName: "services"
    }
  );

  return Service;
};
