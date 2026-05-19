const express = require("express");
const { Movie } = require("../models/movies");
const { Genre } = require("../models/geners");
const router = express.Router();
// @desc get all movies
// @route GET /api/movies
// @access Public
router.get("/", async (req, res) => {
  const movies = await Movie.find();

  res.json(movies);
});
// @desc get movie by id
// @route GET /api/movies/:id
// @access Public
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found.");
  res.json(movie);
});
// @desc create new movie
// @route POST /api/movies
// @access Public
router.post("/", async (req, res) => {
  // check if the genre exists
  const genre = await Genre.findById(req.body.genreId);
  console.log(genre);
  if (!genre) return res.status(400).send("Invalid genre.");
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    stock: req.body.stock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();
  res.json(movie);
});

module.exports = router;
