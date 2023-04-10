const express = require("express");
const Joi = require("joi");
const app = express.Router();
const items = require("../store_db");

// GET /items
app.get("/", (req, res) => {
  res.send(items);
});

//GET /items/:id
app.get("/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item)
    return res.status(404).send("The item with the given ID was not found.");
  res.send(item);
});

// POST /item
app.post("/", (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const item = {
    id: items.length + 1,
    name: req.body.name,
  };

  items.push(item);
  res.send(item);
});

//PUT /items/:id
app.put("/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item)
    return res.status(404).send("The item with the given ID was not found.");

  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  item.name = req.body.name;
  res.send(item);
});

// DELETE /items/:id
app.delete("/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item)
    return res.status(404).send("The item with the given ID was not found.");

  const index = items.indexOf(item);
  items.splice(index, 1);

  res.send(item);
});

function validateItem(item) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(item, schema);
}

module.exports = app;
