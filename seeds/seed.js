const sequelize = require('../config/connection'); 
const { User, Animal, Breed, Species, Behavior, Color, Kennel, QRCode, Photo } = require('../models');
const userData = require('./seeds/userData.json'); 
const animalData = require('./seeds/animalData.json'); 

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Animal.bulkCreate(animalData);

  process.exit(0);
};

seedDatabase();