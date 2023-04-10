const express = require("express");
const app = express.Router();

app.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message });
});

module.exports = app;
