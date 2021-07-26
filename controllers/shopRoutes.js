const router = require('express').Router();
const { Job, User, Item, Category } = require('../models');

// Show all categories
router.get('/', async (req, res) => {
      const allCategories = await Category.findAll();
      const categories = allCategories.map((category) => category.get({ plain: true }));

    res.render('shop', {
        logged_in: req.session.logged_in,
        categories,
      });
});

module.exports = router;
