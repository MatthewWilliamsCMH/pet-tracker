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

router.get('/pack', auth, (req, res) => { //change to whatever the findAll page is
    res.render('pack'); //change to whatever the findAll page is
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
//serialization needs to happen

//model from slavic
// Route to fetch animal data by ID
// app.get('/animals/:id', async (req, res) => {
//     const animalId = req.params.id;

//     try {
//         // Fetch the animal data from the database
//         const animal = await Animal.findByPk(animalId);

//         if (animal) {
//             // Render the Handlebars template named 'animal'
//             res.render('animal', { animal: animal.toJSON() });
//         } else {
//             // Handle case where animal is not found
//             res.status(404).send('Animal not found');
//         }
//     } catch (error) {
//         // Handle errors
//         console.error('Error fetching animal:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

//model from brad

// router.get('/animals', async (req, res) => {
//     try {
//         const animals = await Animal.findAll(); // Fetch all animals
//         res.render('animals', { animals }); // Render 'animals.handlebars' view with the animals data
//     } catch (error) {
//         console.error('Error fetching animals:', error);
//         res.status(500).send('Error fetching animals');
//     }
// });


module.exports = router;