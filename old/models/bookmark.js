"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: {
          foreignKey: "userId",
          onDelete: "cascade",
          hooks: true,
        },
      });
      this.belongsTo(models.Project, {
        foreignKey: "projectId",
      });
    }
  }
  Bookmark.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      bookmarkName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bookmark",
    }
  );
  return Bookmark;
};
