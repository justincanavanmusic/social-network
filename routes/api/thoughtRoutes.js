const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts); //add .post

router.route('/:thoughtId').get(getOneThought);

module.exports = router;