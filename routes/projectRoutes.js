const express = require("express");
const bodyParser = require("body-parser");

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

module.exports = router;
