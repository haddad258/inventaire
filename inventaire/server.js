const express = require("express");
const bodyParser = require("body-parser");

const createError = require("http-errors");
// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;
app.use(express.static(__dirname + "/uploaded"));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Require building routes
const ancien_articleRoutes = require("./src/routes/ancien_article.routes");
const { abort } = require("process");
// using as middleware

app.use("/api/v1/ancien_articles", ancien_articleRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ error: { status: err.status || 500, message: err.message } });
});
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
