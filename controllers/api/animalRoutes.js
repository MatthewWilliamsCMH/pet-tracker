const router = require('express').Router();
const { Animal, Behavior, AnimalBehavior, Breed, Color, Kennel, Species } = require('../../models/')

//authentication function to protect routes from unauthorized access
function auth (req, res, next) {
    console.log('Req Session: ', req.session)
    console.log('Passport: ', req.session.passport)
    console.log('Authorized: ', req.isAuthenticated());

    if (!req.isAuthenticated()) {
        res.redirect('/')
    }
    next()
  };
  
//********** GET and affiliated routes **********/
//I don't think this is used; packroute is handling this
//display all animals
router.get('/pack', auth, async (req, res) => {
    try {
        const animals = await Animal.findAll(); // Fetch all animals
        res.render('pack', { animals }); // Render 'pack.handlebars' view with the animals data
    } catch (error) {
        console.error('Error fetching animals:', error);
        res.status(500).send('Error fetching animals');
    }
});

//display one animal
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
});

//********** POST and affiliated routes ***********/
//add an animal
router.post('/animal', async (req, res) => {
    try {
        const body = req.body
        // Create a new animal entry in the Animal table
        const newAnimal = await Animal.create({...body});
        res.json(newAnimal)
    } 
    catch (error) {
        console.error('Error adding animal:', error);
        res.status(500).json({ success: false, message: 'Error adding animal' });
    }
});

//A duplicate POST route for new animals?
// router.post('/api/animals/animal', async (req, res) => {
//     try {
//         const { name, chip, species, breed, sex, altered, color, kennel, behavior } = req.body;
//         const newAnimal = await Animal.create({
//             name,
//             chip,
//             species,
//             breed,
//             sex,
//             altered,
//             color,
//             kennel,
//             behavior
//         });
//         res.status(201).json(newAnimal);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

//********** PUT and affiliated routes **********/
//update an animal
router.post('/update/:id', auth, async (req, res) => {
    try {
        const animalId = req.params.id;
        const requestData = req.body;
        const updatedData = {
            name: requestData.name,
            chip: requestData.chip,
            species_id: requestData.species,
            breed_id: requestData.breed,
            color_id: requestData.color,
            kennel: requestData.kennel,
            sex: requestData.sex,
            altered: requestData.altered,
            //behaviors
        };
        console.log(req.body)

        // Find the animal by ID
        const animal = await Animal.findByPk(animalId);

        if (!animal) {
            return res.status(404).json({ success: false, message: 'Animal not found' });
        }

        // Update the animal with the new data
        await animal.update(updatedData);
        res.redirect(`/api/animals/${animal.id}`);
    } catch (error) {
        console.error('Error updating animal:', error);
        res.status(500).json({ success: false, message: 'Error updating animal' });
    }
});

//not sure what this is
// Route to handle the update logic (assuming form submission from update page)
// router.post('/animals/:id/update', async (req, res) => {
//     try {
//         const { name, chip, species, breed, sex, altered, color, kennel } = req.body;
//         const animal = await Animal.findByPk(req.params.id);
//         if (animal) {
//             await animal.update({ name, chip, species, breed, sex, altered, color, kennel });
//             res.redirect(`/animals/${animal.id}`);
//         } else {
//             res.status(404).send('Animal not found');
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });


//retrieve data in HTML format for one animal for updating
router.get('/updateHTML/:id', auth, async (req, res) => { 
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
            res.render('update', {animal});
        }
        else {
            res.status(404).send('Animal not found.')
        }
    }
    catch (err) {
        console.error('Error fetching animal:', err);
        res.status(500).send('Internal server error');
    }
});


//retrieve data in JSON for one animal for updating
router.get('/updateJSON/:id', auth, async (req, res) => { 
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
            res.json(animal);
        }
        else {
            res.status(404).send('Animal not found.')
        }
    }
    catch (err) {
        console.error('Error fetching animal:', err);
        res.status(500).send('Internal server error');
    }
});

//********** DELETE and affiliated routes **********/
//delete an animal
router.delete('/animal/:id', auth, async (req, res) => {
    try {
        const animalId = req.params.id;

        // Find the animal by ID
        const animal = await Animal.findByPk(animalId);

        if (!animal) {
            return res.status(404).json({ success: false, message: 'Animal not found' });
        }

        // Delete the animal
        await animal.destroy();

        res.json({ success: true, message: 'Animal deleted successfully' });
    } 
    catch (error) {
        console.error('Error deleting animal:', error);
        res.status(500).json({ success: false, message: 'Error deleting animal' });
    }
});

module.exports = router; //exports the router so it's available to other function