const jwt = require("jsonwebtoken");

// check if user is authenticated
function checkAuth(req, res, next) {
  const checkToken = req.cookies.name;
  if (checkToken) {
    jwt.verify(checkToken, "secret key", (err, decodedToken) => {
      if (err) {
        res.redirect("/user/login");
      } else if (decodedToken) {
        req.user = decodedToken.name;
      }
    });
  } else {
    return res.redirect("/user/login");
  }
  next();
}

module.exports = checkAuth;
