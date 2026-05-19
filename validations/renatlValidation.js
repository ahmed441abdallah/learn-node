const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required().messages({
      "any.required": "Customer ID is required",
    }),
    movieId: Joi.objectId().required().messages({
      "any.required": "Movie ID is required",
    }),
    rentalDate: Joi.date().default(Date.now).required().messages({
      "date.base": "Rental date must be a valid date",
      "date.empty": "Rental date is required",
    }),
    returnDate: Joi.date().optional(),
    fee: Joi.number().min(0).optional(),
  });
  return schema.validate(rental);
}
module.exports = { validateRental };
