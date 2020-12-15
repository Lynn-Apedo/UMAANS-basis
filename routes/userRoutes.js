const express = require("express");
const router = express.Router();

const authMiddleware = require("../utils/jwt");
const userController = require("../controllers/userController");
const jwtUtils = require("../utils/jwt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const NotFoundError = require("../utils/errors/not_found_404_error");

router.get(
  "/user/:userId",
  authMiddleware.authenticateJWT,
  async (req, res) => {
    const userFound = await userController.getUserById(req.user.userID);

    if (userFound) {
      res.status(200).json({
        userFound,
      });
    }
  }
);

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, pseudo } = req.body;

  if (firstName === null || firstName === undefined || firstName === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ prénom n'est pas renseigné"
    );
  }

  if (lastName === null || lastName === undefined || lastName === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ nom n'est pas renseigné"
    );
  }

  if (email === null || email === undefined || email === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ email n'est pas renseigné"
    );
  }

  if (pseudo === null || pseudo === undefined || pseudo === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ pseudo n'est pas renseigné"
    );
  }

  if (typeof pseudo !== "string") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ pseudo doit être une chaîne de caractères"
    );
  }
  const userFound = await userController.checkEmail(email);

  if (userFound) {
    throw new UnauthorizedError(
      "Mauvaise requête - erreur client",
      "Cette adresse email est déjà utilisé"
    );
  }
  const newUser = await userController.addUser(req.body);
  return res.status(201).json({
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    pseudo: newUser.pseudo,
    isPro: newUser.isPro,
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (email === null || email === undefined || email === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ email n'est pas renseigné"
    );
  }

  if (password === null || password === undefined || password === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ pseudo n'est pas renseigné"
    );
  }

  const userFound = await userController.getUserByEmail(email);
  if (userFound) {
    const isIdentified = await userController.checkPassword(
      password,
      userFound.password
    );
    if (isIdentified) {
      res.status(200).json({
        firstName: userFound.firstName,
        token: jwtUtils.generateTokenForUser(userFound),
        user: {
          id: userFound.id,
        },
      });
    } else {
      throw new UnauthorizedError(
        "Mauvaise requête - erreur client",
        "Email ou mot de passe incorrect"
      );
    }
  } else {
    throw new UnauthorizedError(
      "Mauvaise requête - erreur client",
      "Votre compte n'existe pas"
    );
  }
});

router.put("/edituser/:userId", async (req, res) => {
  const data = req.body;
  const userUpdate = await userController.updateUserById(
    req.params.userId,
    data
  );
  res.status(200).json({ project: userUpdate });
});

router.delete("/user/:userId", async (req, res) => {
  const userFound = await userController.deleteUserById(req.params.userId);
  if (userFound) {
    res.status(200).json({
      message: "Utilisateur supprimé",
    });
  } else {
    throw new NotFoundError(
      "Mauvaise requête - erreur client",
      "Cet utilisateur n'a pas été supprimé"
    );
  }
});

router.get(
  "/getprofil/:userId",
  authMiddleware.authenticateJWT,
  async (req, res) => {
    const userFound = await userController.getUserById(req.user.userID);

    if (userFound) {
      res.status(200).json({
        userFound,
      });
    }
  }
);
module.exports = router;
