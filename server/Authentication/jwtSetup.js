/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const jsonWebToken = require("jsonwebtoken");

function generateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  const token = authHeader.split(" ")[1];

  const verification = jsonWebToken.verify(token, "sajak123");

  if (!verification) {
    res.status(401).send("Unauthorized client error");
  } else {
    next();
  }
}

module.exports = generateToken;
