const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  id: String,
  password: String,
  password2: String,
  name: String,
  company_no: String,
  company_name: String,
  company_location: String,
  phonenumber: String,
  ticket: { type: Number, default: 0 },
  admin: { type: Boolean, default: false }
});

const User = model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    id: Joi.string(),
    password: Joi.string(),
    password2: Joi.string(),
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
