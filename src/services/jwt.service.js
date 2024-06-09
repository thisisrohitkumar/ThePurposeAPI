const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET_KEY;

const generateJwt = async (user) => {
  try {
    const payload = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(payload, jwtSecret);
    return token;
  } catch (error) {
    console.log("Error Creating Token", error);
    return null;
  }
};

const verifyJwt = async (token) => {
  try {
    if (!token) {
      return null;
    }

    const decoded = await jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  generateJwt,
  verifyJwt,
};
