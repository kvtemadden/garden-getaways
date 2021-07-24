const router = require('express').Router();
const { Job, User, Category, Item } = require('../models');
const withAuth = require('../utils/auth');

//Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  }
  catch (err) {
    res.status(400).json(err);
    }
});

// Renders page to add an item
router.get('/new', withAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });

    const allCategories = await Category.findAll();

    const categories = allCategories.map((category) => category.get({ plain: true }));


    const userValues = user.dataValues;

    res.render('createItem', {
      logged_in: req.session.logged_in,
      categories,
      userValues,
    });
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Creating a new jitem
router.post('/new', withAuth, async (req, res) => {
  try {

    console.log(req.body)
    const newItem = await Item.create({
      title: req.body.itemTitle,
      description: req.body.itemDescription,
      image: req.body.itemImage,
      category_id: req.body.itemCategory,
      item_url: req.body.itemURL,
    });
    res.status(200).json(newItem);
  }
  catch (err) {
    res.status(400).json(err);
    console.log(err)
    }
});

// // Deleting a job record
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const deleteJob = await Job.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!deleteJob) {
//       res.status(404).json({
//         message: 'No job found with this id!'
//       });
//       return;
//     }

//     res.status(200).json(deleteJob);
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Updating a job record
// router.put('/edit/:id', withAuth, async (req, res) => {
//   try {
//     const thisJob = await Job.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });

//     thisJob.title = req.body.title;
//     thisJob.description = req.body.description;
//     thisJob.role_id = req.body.role_id;

//     if (!thisJob) {
//       res.status(404).json({
//         message: 'No job found with this id!'
//       });
//       return;
//     }

//     res.status(200).json(thisJob);
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// });


// ------------ Routes for Single Job Page -------------

// Gets single job page and comments
router.get('/:item_url', withAuth, async (req, res) => {
  try {
    const findItem = await Item.findOne({
      where: {
        item_url: req.params.item_url,
      },
      include: [
        {
          model: Category,
        }
      ],
    });

    if (!findItem) {
      res.status(404).json(
        {
          message: 'No item found!'
        });
      return;
    }

    const item = findItem.get({ plain: true });

    res.render('singleItem', {
      item,
      logged_in: req.session.logged_in,
    });

    res.status(200);
  }
  catch (err) {
    res.status(500).json(err);
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
        //   attributes: ['item']
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
