const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

const userController = require("../controllers/userController");
const jwtUtils = require("../utils/jwt");

router.get("/user", (req, res) => {
  //   console.log("req de user", req);
  res.send("User Info");
});

router.post("/signup", async (req, res) => {
  const { pseudo, email } = req.body;
  const userFound = await userController.checkEmail(email);
  if (pseudo === null || pseudo === undefined || pseudo === "") {
    return res.status(400).json({
      error: "Le champ pseudo n'est pas renseigné",
    });
  }
  if (email === null || email === undefined || email === "") {
    return res.status(400).json({
      error: "Le champ email n'est pas renseigné",
    });
  }
  if (typeof pseudo !== "string") {
    return res.status(400).json({
      error: "Le champ pseudo doit être une chaîne de caractères",
    });
  }
  if (!userFound) {
    const newUser = await userController.addUser(req.body);
    return res.status(201).json({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      pseudo: newUser.pseudo,
      isPro: newUser.isPro,
    });
  } else {
    // res.send("it's not working, there is already someone using this email");
    return res.status(409).json({
      error: "Cette adresse email est déjà enregistré",
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const userFound = await userController.getUserByEmail(email);
  if (userFound) {
    const isIdentified = await userController.checkPassword(
      password,
      userFound.password
    );
    if (isIdentified) {
      res.status(200).json({
        token: jwtUtils.generateTokenForUser(userFound),
        user: {
          firstName: userFound.firstName,
          lastName: userFound.lastName,
          email: userFound.email,
          pseudo: userFound.pseudo,
          isPro: userFound.isPro,
        },
      });
    } else {
      return res.status(401).json({
        error: "Votre mot de passe n'est pas correct",
      });
    }
  } else {
    return res.status(401).json({
      error: "Votre compte n'existe pas",
    });
  }
});

router.delete("/user/:userId", async (req, res) => {
  const userFound = await userController.deleteUserById(req.params.userId);
  if (userFound) {
    res.status(200).json({
      message: "Utilisateur supprimé",
    });
  } else {
    return res.status(404).json({
      error: "Cet utilisateur n'a pas été supprimé",
    });
  }
});
module.exports = router;
