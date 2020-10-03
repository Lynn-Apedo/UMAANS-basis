const models = require("../models");

const { Country } = models;

module.exports = {
  getCountryById: (id) => {
    return Country.findByPk(id, {
      attributes: ["countryName"],
    });
  },
};
