const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorizeItem = require('../middleware/authorizeItem');
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

router.put('/:id', authenticate, authorizeItem, async (req, res, next) => {
  try {
    const item = await Item.updateById(req.params.id, req.body);
    res.json(item);
  } catch (e) {
    next(e);
  }
});
router.delete('/:id', authenticate, authorizeItem, async (req, res, next) => {
  try {
    const item = await Item.delete(req.params.id);
    res.json(item);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
// TO DO - implement items CRUD
