const sequelize = require('../config/connection');
const { Role, Category, Item } = require('../models');

const roleData = require('./roleData.json');
const categories = require('./categories.json');
const items = require('./items.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

 await Role.bulkCreate(roleData, {
    individualHooks: true,
    returning: true,
  });

  await Category.bulkCreate(categories, {
    individualHooks: true,
    returning: true,
  });
  
  await Item.bulkCreate(items, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
