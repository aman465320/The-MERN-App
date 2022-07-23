const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const varifyAuth = require("../middleware/varifyAuth");
require("../db/connection");
require("../models/userSchema");

router.use(cookieParser());

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ message: "Please fill all the fields" });
  }

  try {
    const foundUser = await User.findOne({ email: email });

    if (foundUser) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "passwords not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      // BCRYPT  HASHING  HERE

      await user.save();

      res.status(201).json({ message: "inserted successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json("Please fill all the fields");
    }
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      const isMatched = await bcrypt.compare(password, foundUser.password);

      const token = await foundUser.generateAuthToken();

      console.log(token);

      res.cookie("jwToken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatched) {
        res.status(400).json({ message: "Invalid credentials" });
      } else {
        res.json({ message: "login successfull" });
      }
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// About us page

router.get("/about", varifyAuth, (req, res) => {
  res.json(req.rootUser);
});

// getting data for Contact us and home page

router.get("/getdata", varifyAuth, (req, res) => {
  res.send(req.rootUser);
});

// contact us page

router.post("/contact", varifyAuth, async (req, res) => {
  try {
    const message = req.body;
    if (!message.mssg) {
      return res.json({ error: "please fill the message field" });
    }
    const user = await User.findOne({ _id: req.userID });
    if (user) {
      const userMessage = await user.addMessage(message);
      await user.save();
      res.status(201).json({ message: "message sent successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Logout page

router.get("/logout", (req, res) => {
  res.clearCookie("jwToken", { path: "/" });
  res.status(200).send("user logout successfull");
});

module.exports = router;
