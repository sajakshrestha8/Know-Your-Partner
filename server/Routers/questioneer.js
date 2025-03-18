/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const dbConnection = require("../DBconnection/connection");
const authentication = require("../Authentication/jwtSetup");

const router = express.Router();
router.use(function (req, res, next) {
  next();
});

router.route("/addDetails").post(authentication, async (req, res) => {
  let { question, answer } = await req.body;
  let requestedUserId = req.UserId;

  const sql = `INSERT INTO data (Question, Answer, UserId) VALUES ("${question}", "${answer}", "${requestedUserId}")`;

  dbConnection.query(sql, async (err) => {
    if (err) throw err;
    res.status(200).json({
      messege: "Question added successfully",
      question: question,
      answer: answer,
    });
  });
});

router.route("/addMessage").post(authentication, async (req, res) => {
  let { message } = await req.body;
  let requestedUserId = req.UserId;

  const sql = `INSERT INTO message (UserId, Message) VALUES ( "${requestedUserId}", "${message}")`;
  dbConnection.query(sql, async (err) => {
    if (err) throw err;
    res.status(200).json({
      message: "New message has been added successfully",
      data: message,
    });
  });
});

module.exports = router;
