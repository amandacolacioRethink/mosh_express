const express = require("express");
const app = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});
app.get("/", (req, res) => {
  res.send(courses);
});

//route parameters
app.get("/:id", (req, res) => {
  res.send(req.params.id);
});

// app.get("/api/posts/:year/:month", (req, res) => {
//   // quandp é parametro colaca o : na frente
//   res.send(req.params);
// });

//get request

app.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given id was not found ");
  res.send(course);
});

//post request

app.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(courses);
});

module.exports = app;
