const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  id: String,
  name: String,
  password: String,
  company_no: String,
  company_name: String,
  company_Location: String,
  phoneNumber: String
});

const User = model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    password: Joi.string(),
    company_no: Joi.string(),
    company_name: Joi.string(),
    company_Location: Joi.string(),
    phoneNumber: Joi.string()
  });
  return schema.validate(user);
}
module.exports = {
  User,
  validateUser
};
