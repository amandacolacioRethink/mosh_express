import express from "express";
const app = express();
import router from "./routes/items.js";

app.use(express.json());
app.use("/items", router);
app.use(express.urlencoded({ extended: true }));

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
