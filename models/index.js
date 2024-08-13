const Animal = require('./animal');
const Behavior = require('./behavior')
const Breed = require('./breed')
const Color = require('./color')
const Kennel = require('./kennel')
const Species = require('./species')
const User = require('./user')

//one-to-one
Animal.belongsTo(Kennel, {foreignKey: 'kennel_id'});
Kennel.hasOne(Animal, {foreignKey: 'kennel_id'});

//one-to-many
Animal.belongsTo(Breed, {foreignKey: 'breed_id', onDelete: 'SET NULL'});
Breed.hasMany(Animal, {foreignKey: 'breed_id'});

Animal.belongsTo(Color, {foreignKey: 'color_id', onDelete: 'SET NULL'});
Color.hasMany(Animal, {foreignKey: 'color_id'});

Animal.belongsTo(Species, {foreignKey: 'species_id', onDelete: 'SET NULL'});
Species.hasMany(Animal, {foreignKey: 'species_id'});

//many-to-many
Animal.belongsToMany(Behavior, {through: 'animalBehavior'});
Behavior.belongsToMany(Animal, {through: 'animalBehavior'});

module.exports = {Animal, Behavior, Breed, Color, Kennel, Species, User}