const mongoose = require("mongoose");
const rentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  rentalDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  returnDate: {
    type: Date,
  },
  fee: {
    type: Number,
    min: 0,
  },
});
const Rental = mongoose.model("Rental", rentalSchema);
module.exports.Rental = Rental;
