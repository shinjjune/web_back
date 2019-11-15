const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { Schema, model } = mongoose;

const advertiseSchema = new Schema({
  id: { type: mongoose.Types.ObjectId, ref: "User" },
  title: String,
  missionUser: String,
  num: { type: Number },
  content: String,
  tag: String,
  startDate: Date,
  endDate: Date,
  survey1: String,
  survey2: String,
  survey3: String,
  imageUpLoad: String,
  category: String,
  ticket: Number
});

const Advertise = model("Advertise", advertiseSchema);

function validateAdver(advertise) {
  const schema = Joi.object({
    id: Joi.string(),
    title: Joi.string(),
    missionUser: Joi.string(),
    num: Joi.number()
      .integer()
      .min(0)
      .max(55),
    content: Joi.string(),
    tag: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    survey1: Joi.string(),
    survey2: Joi.string(),
    survey3: Joi.string(),
    imageUpLoad: Joi.string(),
    category: Joi.string(),
    ticket: Joi.number()
      .integer()
      .min(0)
      .max(55)
  });
  return schema.validate(advertise);
}
module.exports = {
  Advertise,
  validateAdver
};
