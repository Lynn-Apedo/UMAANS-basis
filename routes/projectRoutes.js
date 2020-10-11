const express = require("express");
const bodyParser = require("body-parser");

const models = require("../models");
// const user = require("../models/user");

const { Project } = models;

const router = express.Router();

const authMiddleware = require("../utils/jwt");
const projectController = require("../controllers/projectController");
const countryController = require("../controllers/countryController");
const upload = require("../middleware/upload");
// const { req } = require("express");

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

router.post(
  "/addproject",
  authMiddleware.authenticateJWT,
  upload,
  async (req, res) => {
    const { userRole } = req.user;
    console.log("userRole", userRole);

    const host = req.get("host");
    // console.log("req.get", req.get);
    // console.log("host", host);
    // console.log("req.file ======> ", req.file);
    const projectAdded = {
      ...req.body,
      mainPicture: `${req.protocol}://${host}/upload/${req.file.filename}`,
    };

    if (userRole !== true) {
      return res.status(403).json({
        message: "TEST Vous n'êtes pas autorisé à poster de projet",
      });
    }
    // console.log("req.user isPro", req.user);
    // console.log("req.user", req.user);
    // console.log("req.body", req.body);
    // console.log("req.body.countryId", req.body.countryId);

    const newProject = await projectController.addProject(
      projectAdded,
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
  }
);

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

router.put("/editproject/:projectId", async (req, res) => {
  const data = req.body;
  const projectUpdate = await projectController.updateProjectById(
    req.params.projectId,
    data
  );
  res.status(200).json({ project: projectUpdate });
});

module.exports = router;
