const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const categoryRoutes = require('./categoryRoutes');
const userRoutes = require('./userRoutes');


router.use('/', homeRoutes);
router.use('/categories', categoryRoutes);
router.use('/user', userRoutes);

module.exports = router;
