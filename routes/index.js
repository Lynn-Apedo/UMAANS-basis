const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
const usersRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const bookmarkRoutes = require("./bookmarkRoutes");

router.use(usersRoutes);
router.use(projectRoutes);
router.use(bookmarkRoutes);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Let's start again toward a better future" });
});

router.get("*", (req, res) => {
  res.status(404).json({
    error: "Oups ! Erreur 404!",
  });
});

module.exports = router;
