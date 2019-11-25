const express = require("express");
const router = express.Router();
const { Advertise, validateAdver } = require("../models/advertise");
const { User } = require("../models/user");
const wrapper = require("../common/wrapper");

router.get(
  "/",
  wrapper(async (req, res, next) => {
    const { page = "1" } = req.query;
    const skip = parseInt(page) * 5 - 5;
    {
      const advertises = await Advertise.find()
        .skip(skip)
        // .sort("-date")
        .populate("name");
      res.json({ advertises });
    }
    // const advertises = {},
    //   update = { $inc: { views: 1 } };
    next();
  })
);

// 광고등록
router.post(
  "/mission",
  wrapper(async (req, res, next) => {
    const {
      id: web_user_id,   // web_user ID
      title,
      totalNumber,
      status,
      // currentNumber,
      content,
      survey,
      date,
      startDate,
      endDate
    } = req.body;
    if (validateAdver(req.body).error) {
      // 검증과정 통과 못하면
      res.status(400).json({ result: false });
      next();
      return;
    };

    const user = await User.find({ id: web_user_id })
    console.log(user);
    const advertise = new Advertise({
      id: user[0]._id,  // web_user address
      title,
      status,
      totalNumber,
      // currentNumber,
      content,
      survey,
      date,
      startDate,
      endDate
    });
    const saveResult = await advertise.save(); // db에 저장
    console.log(saveResult);
    res.json({ result: true });
    next();
  })
);
// 광고보기
router.get(
  "/mission_check",
  wrapper(async (req, res, next) => {
    const web_userId = req.query.id;
    console.log(web_userId);
    const WEB_USER = await User.find({ id: web_userId });

    const advertises = await Advertise.find({ id: WEB_USER[0]._id });
    // // advertise.views++;
    // // advertise.save();
    res.json({ advertises });
    next();
  })
);

module.exports = router;
