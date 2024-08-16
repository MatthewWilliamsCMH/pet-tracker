const router = require('express').Router();
const Animal = require('../models/');
// const passport = require('passport');

function auth (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/')
    }
    next()
}

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/pack', auth, async (req, res) => {
    try {
        const animalData = await Animal.findAll();
        const animals = animalData.map((animal) => animal.get({ plain: true }));
        res.render('pack', {
          animals
        });
      }
      catch (err) {
        return res.status(500).json({message: 'Error retrieving the animals.', error: err.message});
      };
      })

router.get('/animals/:id', async (req, res) => { 
    try {
        console.log(req.params.id)
        const animalId = req.params.id;
        const animalData = await Animal.findByPk(animalId);
        const animals = animalData.map((animal) => animal.get({ plain: true }));
// const animals = animalData.map((animal) => animal.get({ plain: true }));
        if (animal) {
            res.render('animal', {animal: animal.toJSON()});
        }
        else {
            res.status(404).send('Animal not found.')
        }
        }
    catch (err) {
        console.error('Error fetching animal:', err);
        res.status(500).send('Internal server error');
    }
})

module.exports = router;