const express = require('express');
const Goods = require('../schemas/Goods');

const router = express.Router();

router.get('/goods', async (req, res, next) => {
  try {
    const goods = await Goods.find();
    res.json({ goods: goods });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/goods', async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  isExist = await Goods.find({ goodsId });
  if (isExist.length == 0) {
    await Goods.create({ goodsId, name, thumbnailUrl, category, price });
  }
  res.send({ result: 'success' });
});

module.exports = router;
