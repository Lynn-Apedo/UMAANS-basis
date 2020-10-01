const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

const authMiddleware = require("../utils/jwt");
const projectController = require("../controllers/projectController");
const jwtUtils = require("../utils/jwt");

// router.get("/projects", (req, res) => {
//   //   const projectFound = await projectController.getAllProjects();
//   //     res.status(200).json();
//   // console.log({ message: "je suis la route projects" });
//   //   const projectFound = await projectController.getAllProjects(req.body);
//   //   if (projectFound) {
//   //     res.status(200).json({
//   //       id: projectFound.id,
//   //       architect: projectFound.architect,
//   //       size: projectFound.size,
//   //       year: projectFound.year,
//   //       category: projectFound.category,
//   //       title: projectFound.title,
//   //       projectDescr: projectFound.projectDescr,
//   //       mainPicture: projectFound.mainPicture,
//   //     });
//   //   }
// });

router.get("/projects", async (req, res) => {
  // const { userRole } = req.user;
  // if (userRole == true) {
  //   return res.status(403).json({
  //     message: "TEST Vous n'êtes pas autorisé à poster de projet",
  //   });
  // }
  //console.log("req", req.body);
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

module.exports = router;
