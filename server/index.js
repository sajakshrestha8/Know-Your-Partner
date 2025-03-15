/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const app = express();
const Port = 8080;
const dbConnection = require("./DBconnection/connection");

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Test");
});

app.post("/addDetails", async (req, res) => {
  let { question, answer } = await req.body;
  const sql = `INSERT INTO data (Question, Answer) VALUES ("${question}", "${answer}")`;

  dbConnection.query(sql, async (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).json({
      messege: "Question added successfully",
      question: question,
      answer: answer,
    });
  });
});

app.post("/signUp", async (req, res) => {
  let { email, password, role } = await req.body;
  const sql = `INSERT INTO user (Email, Password, Role) VALUES ("${email}", "${password}", "${role}")`;

  dbConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      messege: "Account created Successfully",
      email: email,
      role: role,
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = await req.body;
  const sql = `SELECT * FROM user WHERE Email = "${email}" AND Password = "${password}"`;

  dbConnection.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);
    if (result.length === 1) {
      res.status(200).json({
        messege: "Login Successfull",
        email: email,
      });
    } else {
      res.status(401).send("Wrong credentials");
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
