const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const config = require('config')





const router = Router();
// /api/auth
router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimum length of password is 6 chars").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data for registration",
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "This user already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "User has been created" });
    } catch (e) {
      res.status(500).json({ message: "Something goes wrong..." });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "type the correct email").normalizeEmail().isEmail(),
    check("password", "Type the password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data for login",
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({email})

      if(!user){
          return res.status(400).json({message:'User not found'})
      }

      const isMatch = await bcrypt.compare(password,user.password)

      if(!isMatch){
          return res.status(400).json({message:'Invalid password'})
      }

      const token = jwt.sign(
          { userId:user.id },
          config.get('jwtSecret'),
          {expiresIn:'1h'}
      )

      res.json({token,userId:user.id})

    } catch (e) {
      res.status(500).json({ message: "Something goes wrong..." });
    }
  }
);

module.exports = router;
