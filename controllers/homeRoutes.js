const router = require('express').Router();
const {Animal} = require('../models')

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/packroute', async (req,res)=> {
    try {
      const allAnimals = await Animal.findAll();

      const animalArray = allAnimals.map((animal) => animal.get({plain: true}))
        res.render('pack',  { animalArray } )
    } catch (err) {
        console.error(err);
        res.status(500).json()
    }
})

router.get('/new', (req, res) => {
    res.render('new');
});

module.exports = router;