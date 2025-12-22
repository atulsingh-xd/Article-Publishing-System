const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  // IF NO TOKEN:
  if (!token) {
    // Allow public GET requests to continue without a user
    if (req.method === "GET") {
      return next();
    }
    // Block POST/PUT/DELETE/PATCH if no token
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
