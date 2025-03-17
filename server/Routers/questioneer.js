/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const dbConnection = require("../DBconnection/connection");

const router = express.Router();
router.use(function (req, res, next) {
  next();
});

router.route("/addDetails").post(async (req, res) => {
  let { question, answer } = await req.body;
  const sql = `INSERT INTO data (Question, Answer) VALUES ("${question}", "${answer}")`;

  dbConnection.query(sql, async (err) => {
    if (err) throw err;
    res.status(200).json({
      messege: "Question added successfully",
      question: question,
      answer: answer,
    });
  });
});

module.exports = router;
