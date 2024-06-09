const User = require("../models/user.model");
const { hashPassword, verifyPassword } = require("../utils/password.util");
const { generateJwt } = require("../services/jwt.service");

const handleUserRegistration = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmailExists = await User.findOne({ email });

    if (isEmailExists) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ msg: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Creating User!" });
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Email not found!" });
    }

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect Password!" });
    }

    //create jwt
    const token = await generateJwt(user);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    
    return res.status(200).json({ msg: "User Login Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error Login User!" });
  }
};

const handleUserLogout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ msg: "User Logged Out Successfully!" });
};

module.exports = {
  handleUserRegistration,
  handleUserLogin,
  handleUserLogout,
};
