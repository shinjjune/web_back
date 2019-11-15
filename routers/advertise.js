const express = require("express");
const router = express.Router();
const { Advertise, validateAdver } = require("../models/advertise");
const wrapper = require("../common/wrapper");

// 광고등록
router.post("/mission", async (req, res, next) => {
  const {
    id,
    title,
    missionUser,
    num,
    content,
    tag,
    startDate,
    endDate,
    survey1,
    survey2,
    survey3,
    imageUpLoad,
    category,
    ticket
  } = req.body;
  if (validateAdver(req.body).error) {
    // 검증과정 통과 못하면
    res.status(400).json({ result: false });
    next();
    return;
  }
  const advertise = new Advertise({
    id,
    title,
    missionUser,
    num,
    content,
    tag,
    startDate,
    endDate,
    survey1,
    survey2,
    survey3,
    imageUpLoad,
    category,
    ticket
  });
  const saveResult = await advertise.save(); // db에 저장
  res.json({ result: true });
  next();
});
// 광고보기
router.get(
  "/mission_check",
  wrapper(async (req, res, next) => {
    const advertises = await Advertise.find();
    res.json({ advertises });
    next();
  })
);

module.exports = router;