const router = require("express").Router();
const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { registrationValidation, loginValidation } = require("../validation");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", async (req, res) => {
  // validate data before making user

  const { error } = registrationValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // hash the password

  // salt is random number of charcters put infront/back of hash password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);
  // check if user is in DB

  user.findOne({ email: req.body.email }).then((data) => {
    if (!data) {
      // create a new user

      user
        .create({
          name: req.body.name,
          email: req.body.email,
          password: hashedpassword,
        })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json({ message: err });
        });
    } else {
      res.json("email already exists. Please try again");
    }
  });
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  user.findOne({ email: req.body.email }).then(async (data) => {
    if (!data) {
      res.json("invalid email or password");
    } else {
      const validPass = await bcrypt.compare(req.body.password, data.password);

      // valid pass is a boolean value(true/false)
      if (!validPass) {
        res.send("Invalid password");
      } else {
        //create and assign token
        const token = jwt.sign(
          { _id: data._id, email: data.email },
          process.env.TOKEN_SECRET
        );
        // add token to header. You can call token anything. In this case it is "auth-token"
        res.header("auth-token", token);
        res.send(token);
      }
    }
  });
});

module.exports = router;
