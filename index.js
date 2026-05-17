const express = require("express");
const coursesRouter = require("./routes/courses");
const genersRouter = require("./routes/genres");
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
// sync programming
// console.log("First");
// console.log("Second");
// setTimeout(() => {
//   console.log("Third");
// }, 2000);
// console.log("Fourth");
//---------------------------
// Asynchronous programming
// callback function to simulate fetching user data from a database
// const getUSerData = (callback) => {
//   setTimeout(() => {
//     console.log("fetching user data from database....");
//     const user = { id: 1, name: "John Doe" };
//     callback(user);
//   }, 2000);
// };
// getUSerData((user) => {
//   console.log("User data received:", user);
// });
//---------------------------
// Promises
// promise have three states : pending, fulfilled, rejected
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data fetched successfully!");
  }, 2000);
});
// Handling the promise
p.then((message) => {
  console.log(message);
}).catch((error) => {
  console.error("Error:", error);
});
// using prmise
const getUSerData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fetching user data from database....");
      const user = { id: 1, name: "John Doe" };
      resolve(user);
    }, 2000);
  });
};
getUSerData().then((user) => {
  console.log("User data received:", user);
});
