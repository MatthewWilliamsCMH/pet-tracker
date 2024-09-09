const router = require('express').Router();
const { Breed } = require('../../models')

//route to retrieve breeds to populate dropdown list
router.get('/', async (req, res) => {
    try {
        const breeds = await Breed.findAll({
            attributes: ['id', 'breed'],
        });
        console.log(breeds)
        res.json(breeds);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;