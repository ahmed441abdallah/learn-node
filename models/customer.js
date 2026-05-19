const mongoose = require("mongoose");
const customersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 15,
    },
  },
  { timestamps: true },
);
const Customer = mongoose.model("Customer", customersSchema);
module.exports.Customer = Customer;
