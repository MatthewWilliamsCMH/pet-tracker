const router = require('express').Router();
const { Species } = require('../../models')

//route to retrieve species to populate dropdown list
router.get('/', async (req, res) => {
    try {
        const species = await Species.findAll({
            attributes: ['id', 'species'],
        });
        res.json(species);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;