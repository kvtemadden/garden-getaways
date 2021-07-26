const router = require('express').Router();
const { Job, User, Item, Category } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  }
  catch (err) {
    res.status(400).json(err);
    }
});

// Renders page to post a job
router.get('/new', withAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });

    const userValues = user.dataValues;

    res.render('createCategory', {
      logged_in: req.session.logged_in,
      userValues,
    });
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Creating a new job record
router.post('/new', withAuth, async (req, res) => {
  try {
    const newCategory = await Category.create({
      title: req.body.categoryTitle,
      description: req.body.categoryDescription,
      image: req.body.categoryImage,
      category_url: req.body.categoryURL
    });

    res.status(200).json(newCategory);
  }
  catch (err) {
    res.status(400).json(err);
    }
});

// Deleting a category record
router.delete('/:category_url', withAuth, async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        category_url: req.params.category_url,
      }
    })

    const deleteCategory = await Category.destroy({
      where: {
        id: category.id,
      },
    });

    if (!category) {
      res.status(404).json({
        message: 'No category found!'
      });
      return;
    }

    res.status(200).json(deleteCategory);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Updating a category record
router.put('/edit/:category_url', withAuth, async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        category_url: req.params.category_url
      },
    });

    const thisCategory = await Category.update(req.body, {
      where: {
        id: category.id,
      },
    });

    if (!thisCategory) {
      res.status(404).json({
        message: 'No category found!'
      });
      return;
    }

    res.status(200).json(thisCategory);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


// ------------ Routes for Single Job Page -------------

// Gets single job page and comments
router.get('/:category_url', async (req, res) => {
  try {
    //find the category
    const thisCategory = await Category.findOne({
      where: {
        category_url: req.params.category_url
      },
    });

    const allItems = await Item.findAll({
      where: {
        category_id: thisCategory.id,
      }
    });

    const category = thisCategory.dataValues;

    if (!category) {
      res.status(404).json(
        {
          message: 'No job found!'
        });
      return;
    }

    const items = allItems.map((item) => item.get({ plain: true }));

    res.render('singleCategory', {
      category,
      items,
      logged_in: req.session.logged_in,
    });

    res.status(200);
  }
  catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

// Gets the edit job page
router.get('/edit/:category_url', withAuth, async (req, res) => {
  try {
    const thisCategory = await Category.findOne({
      where: {
        category_url: req.params.category_url,
      },
    });

    if (!thisCategory) {
      res.status(404).json(
        {
          message: 'No category found!'
        });
      return;
    }

    const category = thisCategory.dataValues;

    res.render('editCategory', {
      category,
      logged_in: req.session.logged_in,
    });

    res.status(200);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


// // New comments
// router.post('/:id', withAuth, async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       content: req.body.content,
//       user_id: req.session.user_id,
//       job_id: req.body.job_id,
//     });

//     res.status(200).json(newComment);
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router;
