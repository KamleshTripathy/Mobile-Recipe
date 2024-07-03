const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/db.config");
const foodRouter = require("./routes/food.route");
const userRouter = require("./routes/user.route");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/food", foodRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>REST API!!!</h1>");
});

dbConnect();
app.listen(8000, () => console.log("http://localhost:8000"));
