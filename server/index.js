/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const app = express();
const Port = 8080;
const dbConnection = require("./DBconnection/connection");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Test");
});

app.post("/addDetails", (req, res) => {
  let { question, answer } = req.body;
  const sql = `INSERT INTO data (Question, Answer) VALUES ("${question}", "${answer}")`;

  dbConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).json({
      messege: "Question added successfully",
      question: question,
      answer: answer,
    });
  });
});

app.listen(Port, () => {
  console.log("server is running in port", Port);

  dbConnection.connect((err) => {
    if (err) throw err;
    console.log("connection successfull");
  });
});
