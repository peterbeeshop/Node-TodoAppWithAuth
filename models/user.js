const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: String,
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  todo: [{ type: Schema.Types.ObjectId, ref: "todo" }],
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
