"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      this.belongsTo(
        models.User,

        {
          foreignKey: "userId",
        }
      );
      this.belongsTo(models.Country, {
        foreignKey: "countryId",
      });
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      this.hasMany(models.Bookmark, {
        foreignKey: "projectId",
      });
    }
  }
  Project.init(
    {
      userId: DataTypes.INTEGER,
      countryId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,

      architect: DataTypes.STRING,
      size: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
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
