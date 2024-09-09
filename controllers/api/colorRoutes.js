const router = require('express').Router();
const { Color } = require('../../models')

//route to retrieve colors to populate dropdown list
router.get('/', async (req, res) => {
    try {
        const colors = await Color.findAll({
            attributes: ['id', 'color'],
        });
        res.json(colors);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;