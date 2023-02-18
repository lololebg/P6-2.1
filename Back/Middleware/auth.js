const jwt = require("jsonwebtoken");

// On exporte une fonction middleware
module.exports = (req, res, next) => {
// On essaie d'excuter le code suivant
    try {
// On récupere le token depuis l'en tête authorisation
      const token = req.headers.authorization.split(" ")[1];
// On vérifie la validité du token grace au .env
      const TOKEN = jwt.verify(token, process.env.JWT_PASSWORD);
// On récupère l'id à partir du token
      const userId = TOKEN.userId;
// On ajoute l'identifiant de l'utilisateur à la requête.
      req.auth = { userId };
// Si l'id ne correspond pas a l'id donné par le token, on lance une erreur
      if (req.body.userId && req.body.userId !== userId) {
        throw "ID INVALID";
      } else {
        next();
      }} catch {
      res.status(401).json({
      error: new Error("Requete invalid"),
 }); } };
