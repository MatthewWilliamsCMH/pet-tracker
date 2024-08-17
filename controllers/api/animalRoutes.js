const router = require('express').Router();
const { Animal } = require('../../models/')

//authentication function to protect routes from unauthorized access
function auth (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/')
    }
    next()
  };
  
// Route to display one animal
router.get('/:id', auth, async (req, res) => { 
    console.log("*********************HELLO*****************")
    try {
        // console.log(req.params.id)
        // const animalId = req.params.id;
        const animalId = req.params.id;
        const animalData = await Animal.findByPk(animalId);
        const animal = animalData.get({ plain: true });
        console.log(animalData)
        // const animal = animalData.map((animal) => animal.get({ plain: true }));
        if (animal) {
            res.render('animal', {animal});
            // res.render('animal', {animal: animal.toJSON()});
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


// router.get('/project/:id', async (req, res) => {
//     try {
//       const projectData = await Project.findByPk(req.params.id, {
//         include: [
//           {
//             model: User,
//             attributes: ['name'],
//           },
//         ],
//       });

// const project = projectData.get({ plain: true });

// res.render('project', {
//   ...project,
//   logged_in: req.session.logged_in
// });
// } catch (err) {
// res.status(500).json(err);
// }
// });










// Adding a new animal
router.post('/animal', auth, async (req, res) => {
    const { animal_name, animal_chip, animal_species, animal_breed, animal_sex, animal_altered, animal_color, animal_behavior, kennel } = req.body;
    try {
        // Create a new animal entry in the Animal table
        const newAnimal = await Animal.create({
            animal_name,
            animal_chip,
            animal_species,
            animal_breed,
            animal_sex,
            animal_altered,
            animal_color,
            animal_behavior, //this will need to be written into the animalBehavior table
            kennel
        });
        res.json({ success: true, data: newAnimal });
    } catch (error) {
        console.error('Error adding animal:', error);
        res.status(500).json({ success: false, message: 'Error adding animal' });
    }
});


router.put('/animal', auth, async (req, res) => {
    //update existing animal in db
});

router.delete('/animal', auth, async (req, res) => {
    //delete existing animal from db
});

// Route to display all animals
router.get('/pack', auth, async (req, res) => {
    try {
        const animals = await Animal.findAll(); // Fetch all animals
        res.render('pack', { animals }); // Render 'pack.handlebars' view with the animals data
    } catch (error) {
        console.error('Error fetching animals:', error);
        res.status(500).send('Error fetching animals');
    }
});

module.exports = router; //exports the router so it's available to other function