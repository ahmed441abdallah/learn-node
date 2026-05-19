const express = require("express");
const mongoose = require("mongoose");
const { Genre } = require("../models/geners");
const router = express.Router();

// @desc get all genres
// @route GET /api/genres
// @access Public
router.get("/", async (req, res) => {
  // get all genres from database
  const genres = await Genre.find();

  res.json(genres);
});
// @desc get genre by id
// @route GET /api/genres/:id
// @access Public
router.get("/:id", async (req, res) => {
  // look up and find genre
  // if not existing, return 404
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");
  res.json(genre);
});
// @desc create new genre
// @route POST /api/genres
// @access Public
router.post("/", async (req, res) => {
  // create new genre
  try {
    const genre = new Genre({
      name: req.body.name,
    });
    // save genre to database
    await genre.save();
    return res.json(genre);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
// @desc update genre
// @route PUT /api/genres/:id
// @access Public
router.put("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true },
  );
  if (!genre) return res.status(404).send("Genre not found.");
  res.json(genre);
});
// @desc delete genre
// @route DELETE /api/genres/:id
// @access Public
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("Genre not found.");
  res.json(genre);
});
module.exports = router;
