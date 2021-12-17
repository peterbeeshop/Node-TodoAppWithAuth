const User = require("../models/user");
const jwt = require("jsonwebtoken");

//create token
const createToken = (name) => {
  return jwt.sign({ name }, "secret key", { expiresIn: 18000 });
};

const idToken = (id) => {
  return jwt.sign({ id }, "secret key", { expiresIn: 18000 });
};

exports.loginUser_get = (req, res) => {
  res.render("login");
};

exports.loginUser_post = (req, res) => {
  const { name, password } = req.body;
  User.findOne({ name: name }, (err, user) => {
    if (err) {
      console.log(err.message);
    }
    if (!user) {
      console.log("no user found");
      res.send("no user found");
    } else if (user) {
      if (password == user.password) {
        const token = createToken(user.name);
        const tokenId = idToken(user._id);
        res.cookie("name", token, { maxAge: 18000 * 60 });
        res.cookie("id", tokenId, { maxAge: 18000 * 60 });
        res.redirect("/");
      } else {
        res.redirect("/user/login");
      }
    }
  });
};

exports.signupUser_get = (req, res) => {
  res.render("signup");
};

exports.signupUser_post = (req, res) => {
  const { name, password } = req.body;
  const user = new User({
    name,
    password,
  });
  user
    .save()
    .then(() => res.redirect("/user/login"))
    .catch((err) => console.log(err.message));
};

exports.logoutUser_post = (req, res) => {
  res.cookie("name", "", { maxAge: 1 });
  res.cookie("id", "", { maxAge: 1 });
  res.send("logged out the user");
};
