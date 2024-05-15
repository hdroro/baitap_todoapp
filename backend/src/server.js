const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cf = require("./config/cors");
const { errorHandler } = require("./middleware/error");
const app = express();
const port = 8080;
require("dotenv").config();

//cors
cf.configCors(app);

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cookie parser
app.use(cookieParser());
app.use("/api", routes);

mongoose.connect(process.env.URI_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("connected", () => {
    console.log("Connected to MongoDB");
  })
  .on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.use(errorHandler);
