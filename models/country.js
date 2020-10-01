"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      this.hasMany(models.Project, {
        foreignKey: "projectId",
      });
    }
  }
  Country.init(
    {
      countryName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Country",
    }
  );
  return Country;
};
