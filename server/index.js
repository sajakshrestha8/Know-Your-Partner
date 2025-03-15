/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const express = require("express");
const app = express();
const Port = 8080;

app.get("/",(req, res) => {
    res.send("Test");
})

app.listen(Port, () => {
    console.log("server is running in port", Port);
})