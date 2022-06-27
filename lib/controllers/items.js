const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

const router = Router();
router.post('/', authenticate, async (req, res, next) => {
  try {
    const post = await Item.insert({ ...req.body, user_id: req.user.id });
    res.send(post);
  } catch (e) {
    next(e);
  }
});
router.get('/', authenticate, async (req, res, next) => {
  try {
    const items = await Item.getAll(req.user.id);
    res.json(items);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
// TO DO - implement items CRUD
