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
const answerer = require("./Routers/answerer");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());
app.use("/questioneer", questioneer);
app.use("/answerer", answerer);

app.get("/", authentication, async (req, res) => {
  res.send("Test");
});

app.post("/signUp", async (req, res) => {
  let { fullName, email, password, confirmPassword } = await req.body;
  const encryptedPass = await bcrypt.hash(password, 5);

  const checkEmail = `SELECT Email FROM user WHERE Email = "${email}"`;
  dbConnection.query(checkEmail, (err, result) => {
    if (err) throw err;
    console.log("resultData", result);
    console.log("Condition", result.length > 0);
    if (result.length > 0) {
      res.status(403).json({
        messege: "Email already exists",
      });
    } else {
      if (password === confirmPassword) {
        const sql = `INSERT INTO user (FullName, Email, Password) VALUES ("${fullName}","${email}", "${encryptedPass}")`;

        dbConnection.query({ sql, checkEmail }, (err, result) => {
          if (err) throw err;
          res.status(200).json({
            messege: "Account created Successfully",
            email: email,
          });
        });
      } else {
        res.json({
          message: "Password should be same",
        });
      }
    }
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const sql = `SELECT * FROM user WHERE Email = "${email}"`;

  dbConnection.query(sql, async (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      let user = JSON.parse(JSON.stringify(result[0]));
      bcrypt.compare(password, user.Password, (err, result) => {
        if (err) throw err;
        if (result) {
          const token = jsonWebToken.sign(
            {
              UserId: user.UserId,
            },
            "sajak123",
            {
              expiresIn: "1hr",
            }
          );
          res.status(200).json({
            messege: "Login Successfull",
            email: email,
            token: token,
          });
        } else {
          res.status(401).json({ messege: "Wrong credentials" });
        }
      });
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
