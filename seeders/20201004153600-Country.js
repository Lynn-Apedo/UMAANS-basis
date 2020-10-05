"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Countries",
      [
        {
          id: 1,
          countryName: "France",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          countryName: "Inde",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          countryName: "Columbie",
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
