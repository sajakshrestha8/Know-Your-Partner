/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const dbConnection = require("../DBconnection/connection");
const authentication = require("../Authentication/jwtSetup");

const router = express.Router();

router.route("/checkAnswer").post(authentication, async (req, res) => {
  let { answer } = req.body;
  let userId = req.UserId;
  const sql = `SELECT ANSWER, UserId FROM data`;

  dbConnection.query(sql, (err, result) => {
    let index = 0;
    let dbANswer = [];
    if (err) throw err;
    let test = JSON.parse(JSON.stringify(result));

    test?.map((value) => {
      if (userId === value.UserId) {
        dbANswer.push(value.ANSWER);
      }
    });

    if (answer === dbANswer[index]) {
      index = index + 1;
      console.log("answer Milyo");
    } else {
      console.log("answer milena");
    }
  });

  res.send(answer);
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
    console.log("yesma xa");
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
