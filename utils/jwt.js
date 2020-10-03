const jwt = require("jsonwebtoken");

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
        expiresIn: "1h",
      }
    );
  },
  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authHeader", authHeader);

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log("token", token);
      jwt.verify(token, JWT_SIGN_SECRET, (err, user) => {
        if (err) {
          //   console.log("this is err", err);
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({
        error: "Vous devez être connecté pour accéder à cette ressource",
      });
    }
  },
};
