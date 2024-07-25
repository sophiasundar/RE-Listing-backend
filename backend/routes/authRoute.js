const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const router = express.Router();

//   signup
router.post('/signup',async (req,res)=>{
    try { 
      const { username, email, password } = req.body;
      console.log(username,email,password);
  
      const userAlreadyExist = await User.findOne({ email });
      if (userAlreadyExist) {
        res.status(400).send("email already exists!");
      }
  
      const hashedPassword = await bcrypt.hash(password);
      const user = new User({ username, email, password: hashedPassword});
      await user.save();
      res.status(201).send("User registered");
    } catch (error) { 
      console.log(error.message);
      res.status(400).send({ error: error.message });
    }
  });


// login

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("Invalid Credentials!");
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Invalid Credentials!");
      }
  
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY
      );
      res.json({  message: "Successfully Logged In", token : token} );
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ error: error.message });
    }
  });
  
  module.exports = router;