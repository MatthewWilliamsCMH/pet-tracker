const sequelize = require('../config/connection'); 
const { User, Animal, Breed, Species, Behavior, Color, Kennel, AnimalBehavior } = require('../models');
const userData = require('./userData.json'); 
const animalData = require('./animalData.json'); 
const breedData = require('./breedData.json'); 
const speciesData = require('./speciesData.json');
const behaviorData = require('./behaviorData.json');
const colorData = require('./colorData.json');
const kennelData = require('./kennelData.json');
const animalBehaviorData= require('./animalBehaviorData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  await Breed.bulkCreate(breedData);

  await Species.bulkCreate(speciesData);

  await Behavior.bulkCreate(behaviorData);

  await Color.bulkCreate(colorData);

  await Kennel.bulkCreate(kennelData);

  await Animal.bulkCreate(animalData);

  await AnimalBehavior.bulkCreate(animalBehaviorData)
  process.exit(0);
};

seedDatabase();