const express = require("express");
const Customer = require("../models/customer");
const router = express.Router();

// @desc get all customers
// @route GET /api/customers
// @access Public
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});
// @desc get customer by id
// @route GET /api/customers/:id
// @access Public
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer not found.");
  res.json(customer);
});
// @desc create new customer
// @route POST /api/customers
// @access Public
router.post("/", async (req, res) => {
  try {
    const customer = new Customer({
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    });
    await customer.save();
    return res.json(customer);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
// @desc delete customer
// @route DELETE /api/customers/:id
// @access Public
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).send("Customer not found.");
  res.json(customer);
});
module.exports = router;
