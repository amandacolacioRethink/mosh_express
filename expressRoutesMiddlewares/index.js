const express = require("express");
const app = express();
const items = require("./routes/items");

app.use(express.json());
app.use("/items", items);
app.use(express.urlencoded({ extended: true }));

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
