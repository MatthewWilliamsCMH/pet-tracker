const router = require('express').Router();
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

// router.get('/pack', auth, (req, res) => {
//     console.log(req.isAuthenticated())
//     console.log(req.session.passport)
//     res.render('pack');
// });

router.get('/pack', auth, (req, res) => {
    res.render('pack');
  })

router.get('/animals/:id', async (req, res) => { 
const animalId = req.params.id;

    try {
        const animalData = await Animal.findByPk(animalId);

        if (animal) {
            res.render('pack', {animal: animal.toJSON()});
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