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

// Deleting a job record
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteJob = await Job.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteJob) {
      res.status(404).json({
        message: 'No job found with this id!'
      });
      return;
    }

    res.status(200).json(deleteJob);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Updating a job record
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const thisJob = await Job.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    thisJob.title = req.body.title;
    thisJob.description = req.body.description;
    thisJob.role_id = req.body.role_id;

    if (!thisJob) {
      res.status(404).json({
        message: 'No job found with this id!'
      });
      return;
    }

    res.status(200).json(thisJob);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


// ------------ Routes for Single Job Page -------------

// Gets single job page and comments
router.get('/:category_url', withAuth, async (req, res) => {
  try {
    //find the category
    const category = await Category.findOne({
      where: {
        category_url: req.params.category_url
      },
    });

    const allItems = await Item.findAll({
      where: {
        category_id: category.id,
      }
    });
    console.log("Item: " + JSON.stringify(category));

    if (!category) {
      res.status(404).json(
        {
          message: 'No job found!'
        });
      return;
    }

    const items = allItems.map((item) => item.get({ plain: true }));

    res.render('singleCategory', {
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
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });

    const userValues = user.dataValues;
    const checkCustomer = user.is_customer == 1 ? true : false;

    const jobData = await Job.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'job_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username', 'picture']
          }
        },
        {
          model: User,
          attributes: ['username', 'picture']
        },
        // {
        //   model: Role,
        //   attributes: ['category']
        // }
      ],
    });

    if (!jobData) {
      res.status(404).json(
        {
          message: 'No job found with this id!'
        });
      return;
    }

    const job = jobData.get({ plain: true });

    res.render('editJob', {
      job,
      userValues,
      logged_in: req.session.logged_in,
      checkCustomer,
    });

    res.status(200);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


// New comments
router.post('/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      job_id: req.body.job_id,
    });

    res.status(200).json(newComment);
  }
  catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
