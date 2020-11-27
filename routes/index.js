const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser");

const router = express.Router();
const usersRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const bookmarkRoutes = require("./bookmarkRoutes");
const NotFoundError = require("../utils/errors/not_found_404_error");

router.use(usersRoutes);
router.use(projectRoutes);
router.use(bookmarkRoutes);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Let's start again toward a better future" });
});

router.get("*", (req, res) => {
  throw new NotFoundError(
    "Mauvaise requête - erreur client",
    "Oups ! Erreur 404!"
  );
});

module.exports = router;
