const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());
const port = 3000;
const courses = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Python" },
  { id: 3, name: "Java" },
];
// RESTFUL API Endpoints
app.get("/", (req, res) => {
  res.send("Hello, !");
});

app.get("/api/courses", (req, res) => {
  res.json(courses);
});
// Route with query parameters
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found.");
  res.json(course);
});
app.post("/api/courses", (req, res) => {
  // never trust client input, always validate it before using
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);
  // return {error:{details:[{message:"name is required and should be minimum 3 characters long"}]}}
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.status(201).json(course);
});
app.put("/api/courses/:id", (req, res) => {
  // look up and find course
  // if not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found.");
  // update course
  course.name = req.body.name;
  res.json(course);
});
app.delete("/api/courses/:id", (req, res) => {
  // look up and find course
  // if not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found.");
  // delete course
  const updatedCourses = courses.filter(
    (c) => c.id !== parseInt(req.params.id),
  );
  res.json(updatedCourses);
});
// task 1 create restful api for api/genres
const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Horror" },
];
// @desc get all genres
// @route GET /api/genres
// @access Public
app.get("/api/genres", (req, res) => {
  res.json(genres);
});
// @desc get genre by id
// @route GET /api/genres/:id
// @access Public
app.get("/api/genres/:id", (req, res) => {
  // look up and find genre
  // if not existing, return 404
  const gener = genres.find((g) => g.id === parseInt(req.params.id));
  if (!gener) return res.status(404).send("Genre not found.");
  res.json(gener);
});
// @desc create new genre
// @route POST /api/genres
// @access Public
app.post("/api/genres", (req, res) => {
  // never trust client input, always validate it before using
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(req.body);
  // return {error:{details:[{message:"name is required and should be minimum 3 characters long"}]}}
  if (error) return res.status(400).send(error.details[0].message);

  const gener = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(gener);
  res.status(201).json(gener);
});
// @desc update genre
// @route PUT /api/genres/:id
// @access Public
app.put("/api/genres/:id", (req, res) => {
  const gener = genres.find((g) => g.id === parseInt(req.params.id));
  if (!gener) return res.status(404).send("Genre not found.");
  gener.name = req.body.name;
  res.json(gener);
});
// @desc delete genre
// @route DELETE /api/genres/:id
// @access Public
app.delete("/api/genres/:id", (req, res) => {
  const gener = genres.find((g) => g.id === parseInt(req.params.id));
  if (!gener) return res.status(404).send("Genre not found.");
  const updatedGenres = genres.filter((g) => g.id !== parseInt(req.params.id));
  res.json(updatedGenres);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
