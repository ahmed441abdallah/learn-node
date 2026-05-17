const express = require("express");
const router = express.Router();
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
router.get("/", (req, res) => {
  res.json(genres);
});
// @desc get genre by id
// @route GET /api/genres/:id
// @access Public
router.get("/:id", (req, res) => {
  // look up and find genre
  // if not existing, return 404
  const gener = genres.find((g) => g.id === parseInt(req.params.id));
  if (!gener) return res.status(404).send("Genre not found.");
  res.json(gener);
});
// @desc create new genre
// @route POST /api/genres
// @access Public
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
  const gener = genres.find((g) => g.id === parseInt(req.params.id));
  if (!gener) return res.status(404).send("Genre not found.");
  gener.name = req.body.name;
  res.json(gener);
});
// @desc delete genre
// @route DELETE /api/genres/:id
// @access Public
router.delete("/:id", (req, res) => {
  const gener = genres.find((g) => g.id === parseInt(req.params.id));
  if (!gener) return res.status(404).send("Genre not found.");
  const updatedGenres = genres.filter((g) => g.id !== parseInt(req.params.id));
  res.json(updatedGenres);
});
module.exports = router;
