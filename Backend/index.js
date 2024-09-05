const express = require("express");
const app = express();
const router = require("./src/Routes/authRouter");
const connectDb = require("./src/utils/db");

app.use(express.json());
app.use("/api/auth", router);

connectDb().then(() => {
  app.listen(3001, () => console.log("server is running on 3001"));
});
