const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

function auth(req, res, next) {
  const authHeader = req.header("x-auth-token");
  if (!authHeader) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(authHeader, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
}
 
module.exports=auth;