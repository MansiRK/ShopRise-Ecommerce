/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
const express = require("express");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
const cors = require("cors");

const Route = require("./routes/index");

const app = express();

dotenv.config();
app.use(cors());

app.use(cookieparser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is backend");
});

app.use("/", Route.authRoute);
app.use("/", Route.productRoute);
app.use("/", Route.categoryRoute);
app.use("/", Route.orderRoute);
app.use("/", Route.paymentRoute);

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log("Server not running due to error", error);
  }
  console.log(`Server is running on port ${process.env.PORT} `);
});
