const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  work: { type: String, required: true },
  password: { type: String, required: true },
  cpassword: { type: String, required: true },
  date: { type: Date, default: Date.now },
  messages: [
    {
      message: { type: String, required: true },
    },
  ],
  tokens: [{ token: { type: String, required: true } }],
});

// Password Hashing

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// Token generation

userSchema.methods.generateAuthToken = async function () {
  try {
    let tokenNew = jwt.sign({ _id: this._id }, process.env.SECRET);
    this.tokens = this.tokens.concat({ token: tokenNew });
    await this.save();
    return tokenNew;
  } catch (err) {
    console.log(err);
  }
};

//storing messages here
userSchema.methods.addMessage = async function (mssgs) {
  try {
    this.messages = this.messages.concat({ message: mssgs.mssg });
    await this.save();
    return this.messages;
  } catch (err) {
    console.log(mssgs.mssg)
    console.log(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
