const config = require("config");
const Joi = require("joi");
const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const e = require("express");
const helmet = require("morgan");
const morgan = require("helmet");
const courses = require("./routes/courses");
const home = require("./routes/home");

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("tiny"));
app.use("/api/courses", courses);
app.use("/", home);

app.use(logger);

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// app.post();
// app.put();
// app.delete();
