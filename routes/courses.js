const express = require("express");
const router = express.Router();
const Joi = require("joi");
const courses = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Python" },
  { id: 3, name: "Java" },
];
router.get("/", (req, res) => {
  res.json(courses);
});
// Route with query parameters
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found.");
  res.json(course);
});
router.post("/", (req, res) => {
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
router.put("/api/courses/:id", (req, res) => {
  // look up and find course
  // if not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found.");
  // update course
  course.name = req.body.name;
  res.json(course);
});
router.delete("/:id", (req, res) => {
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
module.exports = router;
