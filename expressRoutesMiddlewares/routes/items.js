import express from "express";
import Joi from "joi";
const router = express.Router();
import items from "../store_db.js";

router.get("/", (req, res) => {
  res.send(items);
});

//GET /items/:id
router.get("/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item)
    return res.status(404).send("The item with the given ID was not found.");
  res.send(item);
});

// POST /item
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item)
    return res.status(404).send("The item with the given ID was not found.");

  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  item.name = req.body.name;
  res.send(item);
});

// DELETE /items/:id
router.delete("/:id", (req, res) => {
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

export default router;
