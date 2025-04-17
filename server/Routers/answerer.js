/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const dbConnection = require("../DBconnection/connection");
const authentication = require("../Authentication/jwtSetup");

const router = express.Router();

router.route("/checkAnswer").post(authentication, async (req, res) => {
  let answer = req.body;
  let userId = req.UserId;
  const sql = `SELECT ANSWER, UserId FROM data`;

  try {
    dbConnection.query(sql, (err, result) => {
      let dbANswer = [];
      if (err) throw err;
      let test = JSON.parse(JSON.stringify(result));
      let correctedAnswers = [];

      test?.map((value) => {
        if (userId === value.UserId) {
          dbANswer.push(value.ANSWER);
        }
      });

      if (answer.answer.length !== dbANswer.length) {
        res.status(400).send({ message: "Give all the answers" });
      }

      dbANswer?.map((value, index) => {
        if (answer.answer[index].toLowerCase() === value.toLowerCase()) {
          correctedAnswers.push(value);
        }
      });

      res.status(200).send({
        message: "Your following answers are correct",
        data: correctedAnswers,
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    }
    console.log("catch ma xu ra ma?");
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.route("/getquestions").get(authentication, async (req, res) => {
  const userId = req.UserId;
  const sql = `SELECT Question FROM data where userId = ${userId}`;
  console.log(userId);

  try {
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;

      return res.status(200).send({ message: "Sucessfull", data: result });
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(503).send({ message: error.message });
    }
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
