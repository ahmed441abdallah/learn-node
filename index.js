const express = require("express");
const coursesRouter = require("./routes/courses");
const genersRouter = require("./routes/genres");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Third-party middleware
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}
// Mount the courses router on the /api/courses path
app.use("/api/courses", coursesRouter);
// moount geners router
app.use("/api/geners", genersRouter);

// Home Endpoints
app.get("/", (req, res) => {
  res.send("Hello, From express !");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
