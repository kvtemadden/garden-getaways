const router = require('express').Router();
const { Job, User, Item, Category } = require('../models');
const withAuth = require('../utils/auth');

// Main landing page for all traffic
router.get('/', (req, res) => {
      const user = User.findOne({
        where: {
          id: req.session.user_id,
        },
      });

      const userValues = user.dataValues;
      console.log(userValues)
    res.render('homepage', {
        logged_in: req.session.logged_in,
        userValues,
      });
});

// Login or signup route / redirect page for users not logged in
router.get('/signin', (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signin');
});

// Dashboard route which shows user's own job postings (if any) || must be logged in.
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
              id: req.session.user_id,
            }
          });


          const userValues = user.dataValues;

        const allCategories = await Category.findAll();
        const allItems = await Item.findAll();


        const categories = allCategories.map((category) => category.get({ plain: true }));
        const items = allItems.map((item) => item.get({ plain: true }));

        console.log(categories)

        res.render('dashboard', {
            userValues,
            categories,
            items,
            logged_in: req.session.logged_in,
        });

    }
    catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

//Filtering by specific types of jobs
router.get('/dashboard/:category_url', withAuth, async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    const categories = allCategories.map((category) => category.get({ plain: true }));


      const category = await Category.findOne({
          where: {
            category_url: req.params.category_url,
          },
        });

      const categoryItems = await Item.findAll({
          where: { category_id: category.id },
          order: [['date_created', 'ASC']],
      });

      const items = categoryItems.map((item) => item.get({ plain: true }));

      res.render('dashboard', {
          items,
          categories,
          logged_in: req.session.logged_in,
      });

  }
  catch (err) {
      res.status(500).json(err);
      console.log(err)
  }
});

module.exports = router;
