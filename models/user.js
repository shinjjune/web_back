const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  company_no: { type: String, required: true },
  company_name: { type: String, required: true },
  company_location: { type: String, required: true },
  phonenumber: { type: String, required: true },
  ticket: { type: Number, default: 0, required: true },
  admin: { type: Boolean, default: false }
});

const User = model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    id: Joi.string(),
    password: Joi.string(),
    name: Joi.string(),
    company_no: Joi.string(),
    company_name: Joi.string(),
    company_location: Joi.string(),
    phonenumber: Joi.string(),
    ticket: Joi.number()
  });
  return schema.validate(user);
}
module.exports = {
  User,
  validateUser
};
