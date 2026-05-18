const mongoose = require("mongoose");
const genersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
  },
  { timestamps: true },
);
const Genre = mongoose.model("Genre", genersSchema);
module.exports = Genre;
