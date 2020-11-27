const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/errors/unauthorized_401_error");
const ForbiddenError = require("../utils/errors/forbidden_403_error");

const JWT_SIGN_SECRET =
  "9gMQj5wdpSfYwDBWji3wJoVcXwgEXvaBXc1FFBJiY2yXI9447gzTgCA-kyWOkGTVlEQUuVDqdeKJLLWuHpuU-0GY3SzqwrxxrvkIl8l84HKItZWRFA1UxHh7r7LaF7xUZ";

module.exports = {
  generateTokenForUser: (userData) => {
    return jwt.sign(
      {
        userID: userData.id,
        userRole: userData.isPro,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: "2h",
      }
    );
  },
  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, JWT_SIGN_SECRET, (err, user) => {
        if (err) {
          throw new ForbiddenError(
            "Mauvaise requête - erreur client",
            "erreur token"
          );
        }
        req.user = user;
        next();
      });
    } else {
      throw new UnauthorizedError(
        "Mauvaise requête - erreur client",
        "Vous devez être connecté pour accéder à cette ressource"
      );
    }
  },
};
