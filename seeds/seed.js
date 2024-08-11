const sequelize = require('../config/connection'); 
const User = require('../models/User'); 
const userData = require('./userdata.json'); 

const seedDatabase = async () => {
  await sequelize.sync(); 

  await User.bulkCreate(userData, {
    individualHooks: true, 
    returning: true,
  });

  console.log('Database seeded!');
  process.exit(0);
};

seedDatabase();