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
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      countryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Countries",
          key: "id",
        },
      },
      architect: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      projectDescr: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mainPicture: {
        allowNull: false,
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Projects");
  },
};
