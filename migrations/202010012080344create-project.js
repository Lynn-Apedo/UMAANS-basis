"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        // allowNull: false,
        defaultValue: null,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      countryId: {
        // allowNull: false,
        defaultValue: null,
        type: Sequelize.INTEGER,
        references: {
          model: "Countries",
          key: "id",
        },
      },
      categoryId: {
        // allowNull: false,
        defaultValue: null,
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      architect: {
        allowNull: false,
        // defaultValue: null,
        type: Sequelize.STRING,
      },
      size: {
        allowNull: false,
        // defaultValue: null,
        type: Sequelize.INTEGER,
      },
      year: {
        allowNull: false,
        // defaultValue: null,
        type: Sequelize.INTEGER,
      },
      // category: {
      //   allowNull: false,
      //   type: Sequelize.STRING,
      // },
      title: {
        allowNull: false,
        // defaultValue: null,
        type: Sequelize.STRING,
      },
      projectDescr: {
        allowNull: false,
        // defaultValue: null,
        type: Sequelize.STRING,
      },
      mainPicture: {
        allowNull: false,
        // defaultValue: null,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      // bookmarkId: {
      //   allowNull: false,
      //   // defaultValue: null,
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "Bookmark",
      //     key: "id",
      //   },
      // },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Projects");
  },
};
