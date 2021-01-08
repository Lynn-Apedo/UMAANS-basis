const express = require("express");
const router = express.Router();

const authMiddleware = require("../utils/jwt");
const projectController = require("../controllers/projectController");
const ForbiddenError = require("../utils/errors/forbidden_403_error");

const upload = require("../middleware/upload")

router.get("/getprojects", async (req, res) => {
  const projectFound = await projectController.getAllProjects(
    req.params.userId
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
  if (projectFound) {
    res.status(200).json({
      projectFound,
    });
  }
});

router.post("/addproject", authMiddleware.authenticateJWT, upload, async (req, res) => {
  const { userRole } = req.user;
  const { architect, size, year, title, projectDescr, mainPicture, link } = req.body;

  if (userRole !== true) {
    throw new ForbiddenError(
      "Mauvaise requête - erreur client",
      "Vous n'êtes pas autorisé à poster de projet"
    );
  }

  if (architect === null || architect === undefined || architect === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ 'architecte' n'est pas renseigné"
    );
  }

  if (size === null || size === undefined || size === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ 'superficie du projet' n'est pas renseigné"
    );
  }
  if (year === null || year === undefined || year === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ 'année du projet' n'est pas renseigné"
    );
  }
  if (title === null || title === undefined || title === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ 'titre du projet' n'est pas renseigné"
    );
  }
  if (
    projectDescr === null ||
    projectDescr === undefined ||
    projectDescr === ""
  ) {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ 'description du projet' n'est pas renseigné"
    );
  }
  if (mainPicture === null || mainPicture === undefined || mainPicture === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ 'photo' n'est pas renseigné"
    );
  }
  if (link === null || link === undefined || link === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ 'lien' n'est pas renseigné"
    );
  }

  // const newProject = await projectController.addProject(
  //   req.body,
  //   req.user.userID
  // );
  if (
    req.body.mainPicture == null ||
    req.body.mainPicture == undefined ||
    req.body.mainPicture == ""
  ) {
    req.body.mainPicture = req.body.mainPicture =
      "http://localhost:2088/static/tertert.JPG";
  }
  const newProject = await projectController.addProject(
    // projectAdded,
    req.body,
    req.user.userID
  );
  console.log("okkkkkkkkkkkkkkkkkkkkkk");
  res.status(201).json({
    id: newProject.id,
    architect: newProject.architect,
    size: newProject.size,
    year: newProject.year,
    title: newProject.title,
    projectDescr: newProject.projectDescr,
    mainPicture: newProject.mainPicture,
    link: newProject.link,
  });


  
  
}
);

router.delete("/projects/:projectId", async (req, res) => {
  const project = await projectController.deleteProjectById(
    req.params.projectId
  );
  if (project) {
    res.status(200).json({
      message: "Projet supprimé",
    });
  } else {
    // throw new NotFoundError(
    //   "Mauvaise requête - erreur client",
    //   "Ce projet n'a pas été supprimé"
    // );
    console.log("sorry delete is not working");
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

router.get(
  "/getprojects/:userId",
  authMiddleware.authenticateJWT,
  async (req, res) => {
    const projectFound = await projectController.getAllProjectsById(
      req.user.userID
    );
    if (projectFound) {
      res.status(200).json({
        projectFound,
      });
    }
  }
);

router.get("/test", function (req, res) {
  console.log("BABE DIAMOND");
  return res.send("DIAMOND in the res");
});

module.exports = router;
