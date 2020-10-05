const express = require("express");
const bodyParser = require("body-parser");

const models = require("../models");
// const user = require("../models/user");

const { Project } = models;

const router = express.Router();

const authMiddleware = require("../utils/jwt");
const projectController = require("../controllers/projectController");
const countryController = require("../controllers/countryController");

router.get("/projects", async (req, res) => {
  const projectFound = await projectController.getAllProjects(req.body);
  console.log("projectFound 1", projectFound);
  if (projectFound) {
    res.status(200).json({
      projectFound,
    });
  }
});

router.get("/projects/:projectId", async (req, res) => {
  const projectFound = await projectController.getProjectById(
    req.params.projectId
  );
  console.log("projectFound 2", projectFound);
  if (projectFound) {
    res.status(200).json({
      projectFound,
    });
  }
});

router.post("/projects", authMiddleware.authenticateJWT, async (req, res) => {
  const { userRole } = req.user;
  console.log("userRole", userRole);
  if (userRole !== true) {
    return res.status(403).json({
      message: "TEST Vous n'êtes pas autorisé à poster de projet",
    });
  }
  // console.log("req.user isPro", req.user);
  console.log("req.user", req.user);
  console.log("req.body", req.body);
  console.log("req.body.countryId", req.body.countryId);

  const newProject = await projectController.addProject(req.body);
  res.status(201).json({
    id: newProject.id,
    architect: newProject.architect,
    size: newProject.size,
    year: newProject.year,
    category: newProject.category,
    title: newProject.title,
    projectDescr: newProject.projectDescr,
    mainPicture: newProject.mainPicture,
  });
});

// router.put("/edit/:projectId", async (req, res) => {
//   const projectFound = await projectController.updateProjectById(
//     req.params.projectId
//   );
//   console.log("req.params", req.params.projectId);
//   console.log("projectFound in PATCH", projectFound);

//   // if (projectFound) {
//   //   res.status(200).json({
//   //     projectFound,
//   //   });
//   // } else {
//   //   throw new NotFoundError(
//   //     "Ressource introuvable",
//   //     "Désolé, ce project n'existe pas"
//   //   );
//   // }
// });

// router.patch("/edit/:projectId", async (req, res) => {
//   const projectFound = await projectController.updateProjectById(
//     req.params.projectId
//   );
//   // console.log("projectFound by ID", projectFound);
//   console.log("projectFound", projectFound);

//   console.log("req.params.projectId", req.params.projectId);
//   console.log("req.params", req.params);
//   console.log("req.params", req.body);
//   console.log("req.params", data);

//   // models.Project.update(
//   //   {
//   //     id: projectFound.id,
//   //     architect: projectFound.architect,
//   //     size: projectFound.size,
//   //     year: projectFound.year,
//   //     category: projectFound.category,
//   //     title: projectFound.title,
//   //     projectDescr: projectFound.projectDescr,
//   //     mainPicture: projectFound.mainPicture,
//   //   },
//   //   {
//   //     where: { id: projectFound.id },
//   //   }
//   // ).then(() => res.send("success"));
// });

// router.put("/edit/:projectId", function (req, res) {
//   // console.log("req.params", req.params),
//   //   console.log("req.body", req.body),
//   //   console.log("req.params.projectId", req.params.projectId),
//   // Project.update(
//   //   {
//   //     architect: req.params.architect,
//   //   },
//   //   {
//   //     where: req.params.projectId,
//   //   }
//   // );
// });

router.delete("/projects/:projectId", async (req, res) => {
  const projectFound = await projectController.deleteProjectById(
    req.params.projectId
  );
  console.log("projectFound", projectFound);
  if (projectFound) {
    res.status(200).json({
      message: "Projet supprimé",
    });
  } else {
    return res.status(404).json({
      error:
        " Ce projet n'a pas été supprimé correctement OU il n'existe pas ??",
    });
  }
});

// router.put("/edit/:projectId", projectController.updateProject);

//
// router.put("/edit/:projectId", function (req, res, next) {
//   models.Project.update(
//     {
//       architect: req.body.architect,
//       size: req.body.size,
//       year: req.body.year,
//       category: req.body.category,
//       title: req.body.title,
//       projectDescr: req.body.projectDescr,
//       mainPicture: req.body.mainPicture,
//     },
//     { where: req.params.projectId }
//   )
//     .then(function (rowsUpdated) {
//       res.json(rowsUpdated);
//     })
//     .catch(next);
// });

router.put("/edit/:projectId", async (req, res) => {
  const data = req.body;
  const projectUpdate = await projectController.updateProjectById(
    req.params.projectId,
    data
  );
  res.status(200).json({ project: projectUpdate });
  // const projectFound = await projectController.updateProjectById(req.body);

  // console.log("projectIdFound", projectIdFound);
  // console.log("req.params.projectId", req.params.projectId);
  // console.log("projectFound", projectFound);

  if (projectUpdate) {
    console.log("le projet est trouvé et maintenant?");
  }
});

module.exports = router;
