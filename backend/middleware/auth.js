const jwt = require("jsonwebtoken");

module.exports = (request, res, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const connectedUserId = decodedToken.userId;
    const connectedUserRole = decodedToken.role;
    const authorId = request.body.userId;

    const isAdmin = connectedUserRole === "admin";
    const isAuthor = authorId && authorId === connectedUserId;
    const isUser = connectedUserRole === "user";

    if (isUser || isAuthor || isAdmin) {
      next();
    } else {
      throw "Le token de l'utilisateur n'est pas valable";
    }
  } catch (error) {
    res.status(401).json({ error: error ? error : "Requete non authentifie" });
  }
};
