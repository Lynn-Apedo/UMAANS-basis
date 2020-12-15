"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          id: 1,
          categoryName: "logement",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          categoryName: "rénovation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          categoryName: "commercials et bureaux",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          categoryName: "equipement public",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          categoryName: "éducation",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          categoryName: "paysage et urbanisme",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
