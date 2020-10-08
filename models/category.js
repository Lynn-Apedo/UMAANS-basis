"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Project, {
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
    {
      // projectId: DataTypes.INTEGER,
      categoryName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
