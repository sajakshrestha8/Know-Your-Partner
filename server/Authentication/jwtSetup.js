/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const jsonWebToken = require("jsonwebtoken");

function generateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  const token = authHeader.split(" ")[1];

  try {
    const verification = jsonWebToken.verify(token, "sajak123");
    console.log(verification);
    req.UserId = verification.UserId;
    next();
  } catch (error) {
    return res.status(403).send({ message: "Unauthorized" });
  }
}

module.exports = generateToken;
