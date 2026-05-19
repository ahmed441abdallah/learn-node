require("dotenv").config();
const express = require("express");
const genersRouter = require("./routes/genres");
const customersRouter = require("./routes/customers");
const moviesRouter = require("./routes/movies");
const rentalsRouter = require("./routes/rental");

const mongoose = require("mongoose");
const morgan = require("morgan");
const { set, get } = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Third-party middleware
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}
function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));
}
connectDB();
// Mount the courses router on the /api/courses path
// moount geners router
app.use("/api/geners", genersRouter);
app.use("/api/customers", customersRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/rentals", rentalsRouter);
// Home Endpoints
app.get("/", (req, res) => {
  res.send("Hello, From express !");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
