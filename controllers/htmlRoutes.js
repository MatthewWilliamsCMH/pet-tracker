const router = require('express').Router();
const passport = require('passport');
function auth (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/')
    }
    next()
}

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/register', auth, (req, res) => {
    console.log(req.isAuthenticated())
    console.log(req.session.passport)
    res.render('register');
});

router.get('/new', auth, (req, res) => { 
    res.render('new');
  })

router.get('/pets/:id', async (req, res) => { 
const pedId = req.params.id;

    try {
        const petData = await Animal.findByPk(petId);

        if (pet) {
            res.render('pet', {pet: pet.toJSON()});
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
// app.get('/pets/:id', async (req, res) => {
//     const petId = req.params.id;

//     try {
//         // Fetch the animal data from the database
//         const pet = await Animal.findByPk(petId);

//         if (pet) {
//             // Render the Handlebars template named 'pet'
//             res.render('pet', { pet: pet.toJSON() });
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

// router.get('/pets', async (req, res) => {
//     try {
//         const pets = await Animal.findAll(); // Fetch all pets
//         res.render('pets', { pets }); // Render 'pets.handlebars' view with the pets data
//     } catch (error) {
//         console.error('Error fetching pets:', error);
//         res.status(500).send('Error fetching pets');
//     }
// });


module.exports = router;