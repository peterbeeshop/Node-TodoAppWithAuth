const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const jwt = require("jsonwebtoken");
const checkAuth = require("./common");
const todoRoute = require("./routes/todo");
const port = 3000;
const app = express();

//middleware
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//db connection
mongoose
  .connect("mongodb://localhost/todoWithAuth")
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((e) => console.log(e.message));

//routes
app.get("/", checkAuth, (req, res) => {
  const id = req.cookies.id;

  jwt.verify(id, "secret key", (err, token) => {
    if (err) console.log(err.message);
    if (token) {
      res.render("home", { user: req.user, id: token.id });
    }
  });
});
app.use("/user", userRoute);
app.use(todoRoute);
