/* src/routes/album.js */

const express = require('express');

const songController = require('../controllers/songs')

const router = express.Router();

router.post('/:albumId/song', songController.createsSong);

module.exports = router;


