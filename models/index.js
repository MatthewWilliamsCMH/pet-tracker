//I don't think we need "User" here or in the export below because User is only being used to validate authorized users of the db. In other words, "User" is not stored in any of the database tables and is not associated with any specific animal. Am I right to remove "User"?
//const User = require('./User');
const Animal = require('./Animal');
const Behavior = require('./Behavior')
const Breed = require('./Breed')
const Color = require('./Color')
const Kennel = require('./Kennel')
const Photo = require('./Photo')
const QRCode = require('./QRCode')
const Species = require('./Species')

//one-to-one
Animal.belongsTo(Kennel, {foreignKey: 'kennel_id'});
Kennel.hasOne(Animal, {foreignKey: 'kennel_id'});

Animal.belongsTo(Photo, {foreignKey: 'photo_id'});
Photo.hasOne(Animal, {foreignKey: 'photo_id'});

Animal.belongsTo(QRCode, {foreignKey: 'qrcode_id'});
QRCode.hasOne(Animal, {foreignKey: 'qrcode_id'});

//one-to-many
Animal.belongsTo(Breed, {foreignKey: 'breed_id', onDelete: 'SET NULL'});
Breed.hasMany(Animal, {foreignKey: 'breed_id'});

Animal.belongsTo(Color, {foreignKey: 'color_id', onDelete: 'SET NULL'});
Color.hasMany(Animal, {foreignKey: 'color_id'});

Animal.hasOne(Species, {foreignKey: 'species_id', onDelete: 'SET NULL'});
Species.hasMany(Animal, {foreignKey: 'species_id'});

//many-to-many
Animal.belongsToMany(Behavior, {through 'AnimalBehavior'});
Behavior.belongsToMany(Animal, {through 'AnimalBehavior'});

//The below is my original attempt before consulting chatGPT. Essentially, I had the "hasOne"s reversed and always had the animal_id as teh foreign key. Were these assocations syntactially correct? Semantically, I think they require an "animal_id" filed in the tables where "animal_id" is listed as a foreign key. Is that correct? Finally, would my set up be preferable to chatGPT's—would it be better to have the foreign key in the affiliated tables?

// Animal.belongsToMany(Behavior, { through 'animal-behavior' });
// Behavior.belongsToMany(Animal, { through 'animal-behavior' });

// Animal.hasOne(Breed, {foreignKey: 'animal_id',onDelete: CASCADE});
// Breed.hasMany(Animal, {foreignKey: 'animal_id'});

// Animal.hasOne(Color, {foreignKey: 'animal_id',onDelete: CASCADE});
// Color.hasMany(Animal);

// Animal.hasOne(Kennel, {foreignKey: 'animal_id',onDelete: CASCADE});
// Kennel.belongsTo(Animal, {foreignKey: 'animal_id'});

// Animal.hasOne(Photo, {foreignKey: 'animal_id',onDelete: CASCADE});
// Photo.BelongsTo(Animal, {foreignKey: 'animal_id'});

// Animal.hasOne(QRCode, {foreignKey: 'animal_id',onDelete: CASCADE});
// QRCode.BelongsTo(Animal, {foreignKey: 'animal_id'});

// Animal.hasOne(Species, {foreignKey: 'animal_id',onDelete: CASCADE});
// Species.hasMany(Animal, {foreignKey: 'animal_id'});

module.exports = { User, Animal, Behavior, Breed, Color, Kennel, Photo, QRCode, Species };