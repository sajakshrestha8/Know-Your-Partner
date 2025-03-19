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
  let { email, password } = await req.body;
  const encryptedPass = await bcrypt.hash(password, 5);
  console.log(encryptedPass);
  const sql = `INSERT INTO user (Email, Password) VALUES ("${email}", "${encryptedPass}")`;

  dbConnection.query(sql, (err) => {
    if (err) throw err;
    res.status(200).json({
      messege: "Account created Successfully",
      email: email,
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const sql = `SELECT * FROM user WHERE Email = "${email}"`;

  dbConnection.query(sql, async (err, result) => {
    if (err) throw err;
    console.log(result.length);
    if (result.length > 0) {
      let user = JSON.parse(JSON.stringify(result[0]));
      console.log(user);
      console.log(user.Password);
      bcrypt.compare(password, user.Password, (err, result) => {
        if (err) throw err;

        console.log(result);
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
