const router = require('express').Router();
const { Job, User, Role, Category } = require('../models');
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

        const categories = allCategories.map((category) => category.get({ plain: true }));
        // const otherJobs = allJobs.map((job) => job.get({ plain: true }));
        console.log(categories)
        res.render('dashboard', {
            userValues,
            categories,
            logged_in: req.session.logged_in,
        });

    }
    catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// //Filtering by specific types of jobs
// router.get('/dashboard/:id', withAuth, async (req, res) => {
//   try {
//       const user = await User.findOne({
//           where: {
//             id: req.session.user_id,
//           },
//         });

//       const userValues = user.dataValues;
//       const checkCustomer = user.is_customer == 1 ? true : false;

//       const userJobs = await Job.findAll({
//            include: [
//           {
//             model: User,
//             attributes: ['username', 'is_customer', 'picture']
//           },
//           // {
//           //   model: Role,
//           //   attributes: ['category']
//           // }
//         ],
//           where: { user_id: req.session.user_id },
//           order: [['date_created', 'ASC']],
//       });

//       const allJobs = await Job.findAll({    
//           include: [
//           {
//             model: User,
//             attributes: ['username', 'is_customer', 'picture']
//           },
//           // {
//           //   model: Role,
//           //   attributes: ['category']
//           // }
//         ],
//           where: { role_id: req.params.id, },
//           order: [['date_created', 'ASC']],
//       });

//       const myJobs = userJobs.map((job) => job.get({ plain: true }));
//       const otherJobs = allJobs.map((job) => job.get({ plain: true }));

//       res.render('dashboard', {
//           myJobs,
//           otherJobs,
//           userValues,
//           logged_in: req.session.logged_in,
//       });

//   }
//   catch (err) {
//       res.status(500).json(err);
//   }
// });

module.exports = router;
