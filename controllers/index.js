const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const categoryRoutes = require('./categoryRoutes');
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const shopRoutes = require('./shopRoutes');

router.use('/', homeRoutes);
router.use('/categories', categoryRoutes);
router.use('/items', itemRoutes);
router.use('/user', userRoutes);
router.use('/shop', shopRoutes);

module.exports = router;
