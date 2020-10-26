const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/errors/unauthorized_401_error");
const ForbiddenError = require("../utils/errors/forbidden_403_error");
const JWT_SIGN_SECRET =
  "9gMQj5wdpSfYwDBWji3wJoVcXwgEXvaBXc1FFBJiY2yXI9447gzTgCA-kyWOkGTVlEQUuVDqdeKJLLWuHpuU-0GY3SzqwrxxrvkIl8l84HKItZWRFA1UxHh7r7LaF7xUZ";

//   process.env.JWT_SIGN_SECRET;

module.exports = {
  generateTokenForUser: (userData) => {
    return jwt.sign(
      {
        userID: userData.id,
        userRole: userData.isPro,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: "10h",
      }
    );
  },
  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("JWT authHeader", authHeader);

    if (authHeader) {
      console.log("JWT***authHeader", authHeader);

      // const token = authHeader;
      const token = authHeader.split(" ")[1];

      console.log('JWT****authHeader.split(" ")[1]', authHeader.split(" ")[1]);
      console.log("JWT****token ", token);
      jwt.verify(token, JWT_SIGN_SECRET, (err, user) => {
        if (err) {
          //   console.log("this is err", err);
          throw new ForbiddenError(
            "Mauvaise requête - erreur client",
            "erreur token"
          );
        }
        console.log("JWT user", user);
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
