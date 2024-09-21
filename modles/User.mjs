import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtSecret from "../config/jwt.mjs";

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minLength: 4,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: { type: String },
  image: {
    type: String,
    // default: "image",
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;
  next();
});

userSchema.methods.comparePassword = function (password) {
  const user = this;

  return bcrypt.compareSync(password, user.password);
};

//  GENRATE TOKEN WHEN USER LOGIN
userSchema.methods.generateToken = function () {
  const user = this;

  const token = jwt.sign({ _id: user._id }, jwtSecret);

  return token;
};

const Users = mongoose.model("User", userSchema);

export default Users;
