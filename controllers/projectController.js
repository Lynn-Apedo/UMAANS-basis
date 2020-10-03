const models = require("../models");
const user = require("../models/user");

const { Project, Country } = models;

module.exports = {
  addProject: async (data) => {
    const {
      userId,
      countryId,
      architect,
      size,
      year,
      category,
      title,
      projectDescr,
      mainPicture,
    } = data;
    return await Project.create({
      userId,
      countryId,
      architect,
      size,
      year,
      category,
      title,
      projectDescr,
      mainPicture,
    });
  },
  getAllProjects: () => {
    return Project.findAll({
      // include: [
      //   {
      //     model: Country,
      //     attributes: ["name"],
      //   },
      // ],
    });
  },
};
