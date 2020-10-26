const models = require("../models");
const user = require("../models/user");

const { Project, Country, Category, User } = models;

module.exports = {
  addProject: async (data, userId) => {
    const {
      countryId,
      categoryId,
      architect,
      size,
      year,
      title,
      projectDescr,
      mainPicture,
    } = data;
    return await Project.create({
      userId,
      countryId,
      categoryId,
      architect,
      size,
      year,
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
        {
          model: Category,
          attributes: ["categoryName"],
        },
      ],

      order: [["id", "DESC"]],
      limit: 10,
      raw: true,
      attributes: [
        "id",
        "userId",
        "countryId",
        "categoryId",
        "architect",
        "size",
        "year",
        // "category",
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
        {
          model: Category,
          attributes: ["categoryName"],
        },
      ],
    });
  },

  getProjectByUserId: async (userId) => {
    const currentUser = User.findByPk(userId);
    console.log("currentUser****", currentUser);

    return await Project.findAll({
      include: [
        {
          model: Country,
          attributes: ["countryName"],
        },
        {
          model: Category,
          attributes: ["categoryName"],
        },
      ],
      where: { userId: 1 },
    });
  },

  updateProjectById: async (id, data) => {
    const projectUpdate = await Project.update(data, { where: { id } });
    if (projectUpdate) {
      return await Project.findOne({
        where: { id },
      });
    }
  },

  deleteProjectById: (id) => {
    return Project.destroy({
      where: {
        id,
      },
    });
  },
};
