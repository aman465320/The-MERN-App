const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/connection");
// const User = require("./models/userSchema");

// router linking
app.use(express.json());
app.use(require("./Router/authentication"));

const PORT = process.env.PORT;

// app.get("/about", (req, res) => {
//   console.log("about entered");
//   res.send("About me");
// });


// app.get("/contact", (req, res) => {
//   res.send("Hello contact");
// });


// app.get("/signin", (req, res) => {
//   res.send("Hello login");
// });

app.get("/signup", (req, res) => {
  res.send("Hello registeration");
});

app.listen(PORT, () => {
  console.log(`port ${PORT}`);
});
