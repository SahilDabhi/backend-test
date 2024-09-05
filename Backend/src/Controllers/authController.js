const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const home = async (req, res) => {
  try {
    res.status(200).send("HomePage");
  } catch (error) {
    console.error(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegEx.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 4) {
      return res
        .status(400)
        .json({ message: "Password must be at least 4 characters long" });
    }

    const isUserInDB = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserInDB) {
      const errors = [];
      if (isUserInDB.username === username) {
        errors.push("Username already registered");
      }
      if (isUserInDB.email === email) {
        errors.push("Email already registered");
      }

      return res.status(409).json({ message: errors.join(",") });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashPassword });

    return res.status(201).json({ message: "successfully registered" });
  } catch (error) {
    return res.status(500).json({ msg: "something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json("No email found sign up.");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.json("Password is incorrect");
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);
    return res.json({ status: "Successful login", token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = { home, register, login };
