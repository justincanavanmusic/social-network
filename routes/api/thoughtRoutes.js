const router = require('express').Router();

const {
    getThoughts,
    createThought,
    getOneThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getOneThought);

router.route('/:thoughtId/reactions').post().delete()

module.exports = router;