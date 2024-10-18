import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      password == "" ||
      email === ""
    ) {
      return next(errorHandler(400, "All fields are required"));
    }
    const UserAlreadyExist = await User.findOne({ email });
    if (UserAlreadyExist) {
      return next(errorHandler(409, "User Already exist!"));
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    const { password: pas, ...rest } = newUser._doc;
    res.send(rest);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || password == "" || email === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return next(errorHandler(404, "User not found , please register"));
    }
    const isMatch = bcryptjs.compareSync(password, foundUser.password);
    if (!isMatch) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY);

    res.cookie("access_token", token, {
      // httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
    });

    const { password: pas, ...rest } = foundUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
