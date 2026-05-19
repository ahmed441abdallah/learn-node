const express = require("express");
const { Rental } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movies");
const { validateRental } = require("../validations/renatlValidation");
const router = express.Router();
// @desc get all rentals
// @route GET /api/rentals
// @access Public
router.get("/", async (req, res) => {
  const rentals = await Rental.find()
    .populate("customer", "name -_id")
    .populate("movie", "title -_id");
  res.json(rentals);
});
// @desc crate new rental
// @route POST /api/rentals
// @access Public
router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");
  const rental = new Rental({
    customer: req.body.customerId,
    movie: req.body.movieId,
    fee: req.body.fee,
    rentalDate: req.body.rentalDate,
    returnDate: req.body.returnDate,
  });
  await rental.save();
  // decrease the stock of the movie
  movie.stock--;
  await movie.save();
  res.json(rental);
});

module.exports = router;
