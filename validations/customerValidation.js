const Joi = require("joi");

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      "string.empty": "الاسم مطلوب",
      "string.min": "الاسم يجب أن يتكون من 3 أحرف على الأقل",
      "string.max": "الاسم يجب ألا يتجاوز 50 حرفاً",
    }),

    // isGold عادة لا نجعله required لأن له قيمة افتراضية (false)
    isGold: Joi.boolean(),

    phone: Joi.string().min(5).max(15).required().messages({
      "string.empty": "رقم الهاتف مطلوب",
      "string.min": "رقم الهاتف يجب أن يتكون من 5 أرقام على الأقل",
      "string.max": "رقم الهاتف يجب ألا يتجاوز 15 رقماً",
    }),
  });

  return schema.validate(customer);
}

module.exports = { validateCustomer };
