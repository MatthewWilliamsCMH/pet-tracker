const router = require('express').Router();
const { Animal, Behavior, AnimalBehavior, Breed, Color, Kennel, Species } = require('../../models/')

//authentication function to protect routes from unauthorized access
function auth (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/')
    }
    next()
  };
  
// Route to display one animal
router.get('/:id', auth, async (req, res) => { 
    try {
        const animalId = req.params.id;
        const animalData = await Animal.findOne({
            where: {id: animalId},
            include: [
                {model: Behavior, through: AnimalBehavior, as: 'behaviors'},
                {model: Breed}, 
                {model:Color},
                {model: Kennel},
                {model: Species}
            ]
              
        });
        const animal = animalData.get({ plain: true });
        if (animal) {
            res.render('animal', {animal});
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

// Adding a new animal
router.post('/animal', auth, async (req, res) => {
    const animal_name = req.body["animal-name"]
    const animal_chip = req.body["animal-chip"]
    const animal_species = req.body["animal-species"]
    const animal_breed = req.body["animal-breed"]
    const animal_sex = req.body["animal-sex"]
    const animal_altered = req.body["animal-altered"]
    const animal_color = req.body["animal-color"]
    const animal_behavior = req.body["animal-behavior"]
    const kennel = req.body["kennel"]
    
    try {
        console.log(req.body)
        // Create a new animal entry in the Animal table
        const newAnimal = await Animal.create({
            animal_name,
            animal_chip,
            animal_species,
            animal_sex,
            animal_breed,
            animal_altered,
            animal_color,
            // animal_behavior, //this will need to be written into the animalBehavior table
            kennel
        });
        console.log(animal_name)
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