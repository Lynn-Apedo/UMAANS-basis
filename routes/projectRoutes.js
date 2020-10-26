const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

const models = require("../models");
// const user = require("../models/user");

const { Project, User } = models;

const authMiddleware = require("../utils/jwt");
// const jwtUtils = require("../utils/jwt");
const projectController = require("../controllers/projectController");
const userController = require("../controllers/userController");

const countryController = require("../controllers/countryController");
const ForbiddenError = require("../utils/errors/forbidden_403_error");
const NotFoundError = require("../utils/errors/not_found_404_error");
// const upload = require("../middleware/upload");
// const { req } = require("express");

// router.get("/about");

router.get("/getprojects", async (req, res) => {
  const projectFound = await projectController.getAllProjects(req.body);
  console.log(
    "projectFound 1 =================> s'active qd j'utilise le front?",
    projectFound
  );
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

router.get(
  "/projects/ofuser/:userId",
  authMiddleware.authenticateJWT,
  async (req, res) => {
    const projectFound = await projectController.getProjectByUserId(req.body);
    // const projectFound = await projectController.getAllProjects(req.body);

    console.log("PROJECT ROUTE ***req", req.body);
    console.log("PROJECT ROUTE *****req.user.userID:", req.user.userID);

    const userFound = req.user.userID;

    console.log("req.body", projectFound);
    console.log("req.user.userID", userFound);

    if (projectFound) {
      res.status(200).json({
        projectFound,
      });
    }
  }
);

router.post("/addproject", authMiddleware.authenticateJWT, async (req, res) => {
  const { userRole } = req.user;
  console.log("userRole", userRole);
  console.log("req.body", req.body);

  if (userRole !== true) {
    throw new ForbiddenError(
      "Mauvaise requête - erreur client",
      "Vous n'êtes pas autorisé à poster de projet"
    );
  }

  const newProject = await projectController.addProject(
    req.body,
    req.user.userID
  );

  res.status(201).json({
    id: newProject.id,
    architect: newProject.architect,
    size: newProject.size,
    year: newProject.year,
    // category: newProject.category,
    title: newProject.title,
    projectDescr: newProject.projectDescr,
    mainPicture: newProject.mainPicture,
  });
});

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
    throw new NotFoundError(
      "Mauvaise requête - erreur client",
      "Ce projet n'a pas été supprimé"
    );
  }
});

router.put("/editproject/:projectId", async (req, res) => {
  const data = req.body;
  const projectUpdate = await projectController.updateProjectById(
    req.params.projectId,
    data
  );
  res.status(200).json({ project: projectUpdate });
});

module.exports = router;
