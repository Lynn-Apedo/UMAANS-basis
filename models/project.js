"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Country);
    }
  }
  Project.init(
    {
      userId: DataTypes.INTEGER,
      countryId: DataTypes.INTEGER,

      architect: DataTypes.STRING,
      size: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      category: DataTypes.STRING,
      title: DataTypes.STRING,
      projectDescr: DataTypes.STRING,
      mainPicture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
