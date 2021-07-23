const User = require('./User');
const Item = require('./Item');
const Role = require('./Role');
const Category = require('./Category');


Role.hasOne(User, {
  foreignKey: 'role_id',
  onDelete: 'CASCADE'
});

User.belongsTo(Role, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE'
});

User.hasOne(Category, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Category.belongsTo(User);

User.hasOne(Item, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Item.belongsTo(User);

Category.hasMany(Item, {
  foreignKey: 'category_id'
});

Item.belongsTo(Category);

module.exports = { User, Item, Category, Role };
