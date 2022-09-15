const express = require("express");
const app = express();
const cors = require("cors");
const createError = require("http-errors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
console.log("panthil malaviya");

const port = process.env.PORT || 5050;

// //Order Router
const OrderRouter = require("./routes/order.router");
app.use("/", OrderRouter);

app.listen(port, () => {
  console.log(`Server is running on ${process.env.HOST}/`);
});
