const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { Schema, model } = mongoose;

const advertiseSchema = new Schema({
  id: { type: mongoose.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  status: { type: String, default: "waiting" },
  totalNumber: String,
  currentNumber: { type: Number, default: 0 },
  content: { type: String, required: true },
  survey: { type: String, required: true },
  date: { type: Date, default: Date.now },
  startDate: Date,
  endDate: Date,
  views: { type: Number, default: 0 }
});

const Advertise = model("Advertise", advertiseSchema);

function validateAdver(advertise) {
  const schema = Joi.object({
    id: Joi.string(),
    title: Joi.string(),
    status: Joi.string(),
    totalNumber: Joi.number(),
    currentNumber: Joi.number()
      .integer()
      .max(55),
    content: Joi.string(),
    survey: Joi.string(),
    date: Joi.date(),
    startDate: Joi.date(),
    endDate: Joi.date()
  });
  return schema.validate(advertise);
}
module.exports = {
  Advertise,
  validateAdver
};
