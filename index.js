const express = require("express");
const coursesRouter = require("./routes/courses");
const genersRouter = require("./routes/genres");
const app = express();
const Joi = require("joi");
const morgan = require("morgan");
app.use(express.json());
// Mount the courses router on the /api/courses path
app.use("/api/courses", coursesRouter);
// moount geners router
app.use("/api/geners", genersRouter);
console.log(app.get("env")); // development
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}
const port = process.env.PORT || 3000;

// Home Endpoints
app.get("/", (req, res) => {
  res.send("Hello, !");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
