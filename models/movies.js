const mongoose = require("mongoose");
const { genersSchema } = require("./geners");
const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  genre: {
    required: true,
    type: genersSchema,
  },
  stock: Number,
  dailyRentalRate: Number,
});
const Movie = mongoose.model("Movie", moviesSchema);
module.exports.Movie = Movie;
