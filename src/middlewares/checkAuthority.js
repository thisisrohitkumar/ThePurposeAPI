const { verifyJwt } = require("../services/jwt.service");

const checkAuthority = (requiredRole) => {
  return (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No token provided, authorization denied" });
    }

    try {
      const decoded = verifyJwt(token);
      req.user = decoded;
      if (requiredRole && req.user.role !== requiredRole)
        return res
          .status(403)
          .json({ msg: "Access denied, insufficient permissions" });

        next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ msg: 'Token is not valid' });
    }
  };
};

module.exports = checkAuthority;
