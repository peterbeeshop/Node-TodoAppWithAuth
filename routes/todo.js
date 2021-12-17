const express = require("express");
const jwt = require("jsonwebtoken");
const todoRoute = express.Router();
const Todo = require("../models/todo");
const User = require("../models/user");
const checkAuth = require("../common");

todoRoute.get("/todo/:id", checkAuth, (req, res) => {
  User.findById(req.params.id)
    .populate("todo")
    .then((user) => {
      res.render("todo", { todos: user.todo, name: user.name, id: user._id });
    });
});

todoRoute.post("/createTodo/:id", checkAuth, (req, res) => {
  const id = req.params.id;
  Todo.create(req.body)
    .then((createdTodo) => {
      return User.findOneAndUpdate(
        { _id: id },
        { $push: { todo: createdTodo._id } },
        { new: true }
      );
    })
    .then(() => {
      res.redirect(`/todo/${id}`);
    })
    .catch((e) => console.log(e.message));
});

todoRoute.get("/updateTodo/:id", checkAuth, (req, res) => {
  const id = req.cookies.id;
  jwt.verify(id, "secret key", (err, token) => {
    if (err) console.log(err);
    if (token) {
      Todo.findById(req.params.id)
        .then((todo) => {
          res.render("updateTodo", { todo: todo, id: token.id });
        })
        .catch((e) => console.log(e.message));
    }
  });
});

todoRoute.put("/updateTodo/:id", checkAuth, (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  Todo.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title },
    { new: true },
    (err, result) => {
      if (err) console.log(err.message);
      if (result) {
        console.log(result);
        res.json(result);
      }
    }
  );
});

todoRoute.delete("/deleteTodo/:id", checkAuth, (req, res) => {
  const id = req.params.id;
  console.log(id);

  Todo.findByIdAndDelete({ _id: id })
    .then(() => {
      res.send("deleted todo");
    })
    .catch((e) => console.log(e.message));
});

module.exports = todoRoute;
