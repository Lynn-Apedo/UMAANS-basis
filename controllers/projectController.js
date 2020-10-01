const models = require("../models");

const { Project, Country } = models;

module.exports = {
  addProject: async (data) => {
    const {
      countryId,
      userId,
      bookmarkId,
      architect,
      size,
      year,
      category,
      title,
      projectDescr,
      mainPicture,
    } = data;
    return await Project.create({
      countryId,
      userId,
      bookmarkId,
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
      include: [
        {
          model: Country,
          attributes: ["name"],
        },
      ],
    });
  },
};
