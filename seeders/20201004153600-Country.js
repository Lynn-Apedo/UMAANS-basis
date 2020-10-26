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
          countryName: "Colombie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          countryName: "Brésil",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          countryName: "Chine",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          countryName: "Thailande",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          countryName: "Australie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          countryName: "Singapour",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          countryName: "Danemark",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          countryName: "Angleterre",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          countryName: "Taiwan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 12,
          countryName: "Indonésie",
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
