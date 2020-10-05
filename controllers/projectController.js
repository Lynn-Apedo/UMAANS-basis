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
  updateProjectById: async (id, data) => {
    // const {
    //   userId,
    //   countryId,
    //   architect,
    //   size,
    //   year,
    //   category,
    //   title,
    //   projectDescr,
    //   mainPicture,
    // } = data;
    const projectUpdate = await Project.update(data, { where: { id } });
    if (projectUpdate) {
      return await Project.findOne({
        where: { id },
      });
    }
  },
  // getProjectByIdUp: (projectId) => {
  //   return Project.findByPk(projectId, {});
  // },
  // updateProjectById: (id, data) => {
  //   return Project.update(data, {
  //     where: {
  //       id,
  //     },
  //     fields: [
  //       "id",
  //       "userId",
  //       "countryId",
  //       "architect",
  //       "size",
  //       "year",
  //       "category",
  //       "title",
  //       "projectDescr",
  //       "mainPicture",
  //     ],
  //   });
  // },

  // updateProject: async (req, res) => {
  //   try {
  //     const { projectId } = req.params;
  //     console.log("projectId 1 in try", projectId);
  //     // console.log("req.body", req);
  //     const allProjects = await models.Project.findAll({
  //       attributes: [
  //         "id",
  //         "userId",
  //         "countryId",
  //         "architect",
  //         "size",
  //         "year",
  //         "category",
  //         "title",
  //         "projectDescr",
  //         "mainPicture",
  //       ],
  //     });
  //     // console.log("allProjects", allProjects);

  //     // const updated = await models.Project.update(allProjects, {
  //     //   where: { id: projectId },
  //     // });
  //     // console.log("updated 1", updated);
  //     if (allProjects) {
  //       // console.log("updated 2", updated);
  //       console.log("projectId 2 in if", projectId);

  //       // const updateProject = await models.Project.findOne({
  //       //   where: { id: projectId },
  //       // });
  //       // console.log("findOne", updateProject)

  //       const updated = await models.Project.update(allProjects, {
  //         where: { id: projectId },
  //       });
  //       // console.log("updateProject", updated);
  //       return res.status(200).json({ architect: "where the hell are you" });
  //     }
  //     throw new Error("Post not found");
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  deleteProjectById: (id) => {
    return Project.destroy({
      where: {
        id,
      },
    });
  },

  // updateProject: async (req, res) => {
  //   try {
  //     const { projectId } = req.params;
  //     console.log("projectId 1 in try", projectId);
  //     const allProjects = await models.Project.findAll({
  //       attributes: [
  //         "id",
  //         "userId",
  //         "countryId",
  //         "architect",
  //         "size",
  //         "year",
  //         "category",
  //         "title",
  //         "projectDescr",
  //         "mainPicture",
  //       ],
  //     });

  //     if (allProjects) {
  //       console.log("projectId 2 in if", projectId);

  //       const updated = await models.Project.update(allProjects, {
  //         where: { id: projectId },
  //       });
  //       return res.status(200).json({ architect: "where the hell are you" });
  //     }
  //     throw new Error("Post not found");
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
};
