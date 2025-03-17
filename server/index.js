/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const app = express();
const jsonWebToken = require("jsonwebtoken");
const Port = 8080;
const dbConnection = require("./DBconnection/connection");
const authentication = require("./Authentication/jwtSetup");
const questioneer = require("./Routers/questioneer");

app.use(express.json());
app.use("/questioneer", questioneer);

app.get("/", authentication, async (req, res) => {
  res.send("Test");
});

app.post("/signUp", async (req, res) => {
  let { email, password } = await req.body;
  const sql = `INSERT INTO user (Email, Password) VALUES ("${email}", "${password}")`;

  dbConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      messege: "Account created Successfully",
      email: email,
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = await req.body;
  const sql = `SELECT * FROM user WHERE Email = "${email}" AND Password = "${password}"`;

  const auth = dbConnection.query(sql, (err, result) => {
    try {
      if (err) throw err;

      let userId = result[0].UserId;
      const token = jsonWebToken.sign(
        {
          UserId: userId,
        },
        "sajak123",
        {
          expiresIn: "1hr",
        }
      );
      if (result.length === 1) {
        res.status(200).json({
          messege: "Login Successfull",
          email: email,
          token: token,
        });
      } else {
        res.status(401).send("Wrong credentials");
      }
    } catch (error) {
      console.log(err);
    }
  });
});

app.listen(Port, () => {
  console.log("server is running in port", Port);

  dbConnection.connect((err) => {
    if (err) throw err;
    console.log("connection successfull");
  });
});
