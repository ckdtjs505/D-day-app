// import express from "express";
// import path from "path";

const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// app.engine("pug", require("pug").__express);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("main");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
