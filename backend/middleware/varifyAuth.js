const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwToken;
    const verifyToken = jwt.verify(token, process.env.SECRET);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized : NO TOKEN PROVIDED");
    console.log(err);
  }
};
module.exports = Authenticate;
