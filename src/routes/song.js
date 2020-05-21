/* src/routes/song.js */

const express = require('express');

const songController = require('../controllers/songs')

const router = express.Router();


router.route('/:songId')
  .patch(songController.updateSongById)
  .delete(songController.deleteSongById);

module.exports = router;