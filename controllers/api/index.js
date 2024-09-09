const router = require('express').Router();
const userRoutes = require('./userRoutes')
const animalRoutes = require('./animalRoutes')
const breedRoutes = require('./breedRoutes')
const speciesRoutes = require('./speciesRoutes')
const colorRoutes = require('./colorRoutes')
const { Animal, Behavior, AnimalBehavior, Breed, Color, Kennel, Species } = require('../../models/')

// all of these routes are prefixed with '/api'
router.use('/users', userRoutes);
router.use('/animals', animalRoutes);
router.use('/breeds', breedRoutes);
router.use('/species', speciesRoutes);
router.use('/color', colorRoutes);


router.get('/all', async (req, res)=> {
    try {
      const alltheshit = await Animal.findAll({
        include: [
            {model: Behavior, through: AnimalBehavior} ,
            {model: Breed}, 
            {model:Color},
            {model: Kennel},
            {model: Species}
         ]
      })
      res.status(200).json(alltheshit)  
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

module.exports = router;