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
          countryName: "Espagne",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          countryName: "Chine",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          countryName: "Australie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          countryName: "Bresil",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          countryName: "Portugal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          countryName: "Mexique",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          countryName: "Burkina Faso",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          countryName: "Colombie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          countryName: "Allemagne",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 11,
          countryName: "Inde",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 12,
          countryName: "Singapour",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 13,
          countryName: "Malaisie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 14,
          countryName: "Japon",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 15,
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
