/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const express = require("express");
const app = express();
const Port = 8080;
let data = [];

app.use(express.json());

app.get("/",(req, res) => {
    res.send("Test");
})

app.post("/addDetails", (req,res) => {
    let {id, question, answer} = req.body;
    data.push({
        id: id,
        question: question,
        answer: answer
    })
    res.send(data);
})

app.listen(Port, () => {
    console.log("server is running in port", Port);
})