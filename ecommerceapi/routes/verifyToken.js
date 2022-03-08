const jwt = require("jsonwebtoken");

//middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; //split token value from Bearer
    jwt.verify(token, process.env.TKN_KEY, (err, userAuth) => {
      //if err return error, if not assign userAuth to request
      if (err) return res.status(403).json("Token is not valid");
      req.user = userAuth; //user can be replaced by other name (req.**BEBAS**)
      next(); //execute next function in other function
    });
  } else {
    return res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
