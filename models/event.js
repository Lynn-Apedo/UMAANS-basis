'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      this.belongsTo(
        models.User,
        {
          foreignKey: "userId",
        }
      );
      
  };
}
  Event.init({
    userId: DataTypes.INTEGER,

    date: DataTypes.STRING,
    eventType: DataTypes.STRING,
    eventName: DataTypes.STRING,
    eventPlace: DataTypes.STRING,
    eventDescr: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};