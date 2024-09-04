const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const UserModel = require("./src/Models/User");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/users");

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return UserModel.create({ username, email, password: hash });
    })
    .then(() => {
      res.json({ status: "successfully added" });
    })
    .catch((err) => {
      res.status(500).json({ status: "error", error: err.message });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email },
            "12135943773f7155f9d000b0c34d9d831e6fc00249fd163eaaeb27cffb6dc111",
            //token generatd using
            //node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
            {
              expiresIn: "1d",
            }
          );
          res.cookie("token", token);
          return res.json({ status: "Successful", token: token });
        } else {
          return res.json("password is incorrect  ");
        }
      });
    } else {
      return res.json("No record found");
    }
  });
});

app.listen(3001, () => {
  console.log("running on 3001");
});
