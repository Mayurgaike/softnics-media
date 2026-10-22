const { DataTypes } = require("sequelize");

const SERVICE_COLUMNS = {
  content: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("draft", "published"),
    allowNull: false,
    defaultValue: "published",
  },
  metaTitle: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  metaDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  metaKeywords: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ogTitle: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ogDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  twitterTitle: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  twitterDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  schemaCode: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  canonicalUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  customHeaderCode: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
};

const BLOG_COLUMNS = {
  content: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("draft", "published"),
    allowNull: false,
    defaultValue: "published",
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  metaTitle: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  metaDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  metaKeywords: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ogTitle: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ogDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  twitterTitle: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  twitterDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  schemaCode: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  canonicalUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  customHeaderCode: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. SERVICES
    const serviceTable = await queryInterface.describeTable("services");
    for (const [colName, colDef] of Object.entries(SERVICE_COLUMNS)) {
      if (!serviceTable[colName]) {
        console.log(`Adding column services.${colName}...`);
        await queryInterface.addColumn("services", colName, colDef);
      } else {
        console.log(`Column services.${colName} already exists, skipping.`);
      }
    }

    // Ensure all existing services are published
    await queryInterface.sequelize.query(
      "UPDATE `services` SET `status` = 'published' WHERE `status` IS NULL OR `status` = ''"
    );

    // 2. BLOGS
    const blogTable = await queryInterface.describeTable("blogs");
    for (const [colName, colDef] of Object.entries(BLOG_COLUMNS)) {
      if (!blogTable[colName]) {
        console.log(`Adding column blogs.${colName}...`);
        await queryInterface.addColumn("blogs", colName, colDef);
      } else {
        console.log(`Column blogs.${colName} already exists, skipping.`);
      }
    }

    // Ensure all existing blogs are published
    await queryInterface.sequelize.query(
      "UPDATE `blogs` SET `status` = 'published' WHERE `status` IS NULL OR `status` = ''"
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Non-destructive safe rollback: only drop added columns if they exist
    const serviceTable = await queryInterface.describeTable("services");
    for (const colName of Object.keys(SERVICE_COLUMNS)) {
      if (serviceTable[colName]) {
        console.log(`Removing column services.${colName}...`);
        await queryInterface.removeColumn("services", colName);
      }
    }

    const blogTable = await queryInterface.describeTable("blogs");
    for (const colName of Object.keys(BLOG_COLUMNS)) {
      if (blogTable[colName]) {
        console.log(`Removing column blogs.${colName}...`);
        await queryInterface.removeColumn("blogs", colName);
      }
    }
  },
};

