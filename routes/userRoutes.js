const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
const authMiddleware = require("../utils/jwt");

const userController = require("../controllers/userController");
const jwtUtils = require("../utils/jwt");
const BadRequestError = require("../utils/errors/bad_request_400_error");
const UnauthorizedError = require("../utils/errors/unauthorized_401_error");
const NotFoundError = require("../utils/errors/not_found_404_error");
router.get(
  "/user/:userId",
  authMiddleware.authenticateJWT,
  async (req, res) => {
    //   console.log("req de user", req);
    // res.send("User Info");
    const userFound = await userController.getUserById(req.user.userID);
    console.log("userFound1", userFound);

    if (userFound) {
      console.log("userFound2", userFound);
      res.status(200).json({
        userFound,
      });
    }
  }
);

router.post("/signup", async (req, res) => {
  const { pseudo, email } = req.body;
  const userFound = await userController.checkEmail(email);
  if (pseudo === null || pseudo === undefined || pseudo === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ pseudo n'est pas renseigné"
    );
  }
  if (email === null || email === undefined || email === "") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ email n'est pas renseigné"
    );
  }
  if (typeof pseudo !== "string") {
    throw new BadRequestError(
      "Mauvaise requête - erreur client",
      "Le champ pseudo doit être une chaîne de caractères"
    );
  }
  if (!userFound) {
    const newUser = await userController.addUser(req.body);
    return res.status(201).json({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      pseudo: newUser.pseudo,
      isPro: newUser.isPro,
    });
  } else {
    // res.send("it's not working, there is already someone using this email");
    throw new UnauthorizedError(
      "Mauvaise requête - erreur client",
      "Cette adresse email est déjà utilisé"
    );
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
          id: userFound.id,
          firstName: userFound.firstName,
          lastName: userFound.lastName,
          email: userFound.email,
          pseudo: userFound.pseudo,
          isPro: userFound.isPro,
        },
      });
    } else {
      throw new UnauthorizedError(
        "Mauvaise requête - erreur client",
        "Votre mot de passe n'est pas correct"
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
    //   console.log("req de user", req);
    // res.send("User Info");
    const userFound = await userController.getUserById(req.user.userID);
    console.log("userFound1", userFound);

    if (userFound) {
      console.log("userFound2", userFound);
      res.status(200).json({
        userFound,
      });
    }
  }
);
module.exports = router;
