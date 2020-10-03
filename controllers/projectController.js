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
      include: [
        {
          model: Country,
          attributes: ["countryName"],
        },
      ],
      order: [["id", "DESC"]],
      limit: 10,
      raw: true,
      attributes: [
        "id",
        "userId",
        "countryId",
        "architect",
        "size",
        "year",
        "category",
        "title",
        "projectDescr",
        "mainPicture",
      ],
    });
  },
  getProjectById: (projectId) => {
    return Project.findByPk(projectId, {
      include: [
        {
          model: Country,
          attributes: ["countryName"],
        },
      ],
    });
  },
  deleteProjectById: (id) => {
    return Project.destroy({
      where: {
        id,
      },
    });
  },
};
