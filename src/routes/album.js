/* src/routes/album.js */

const express = require('express');

const songController = require('../controllers/songs')

const router = express.Router();

router.post('/:albumId/song', songController.createsSong);

router.get('/:albumId/song', songController.listSongsByAlbum);

router.patch('/:albumId/song', songController.updatesSongByAlbum);

router.delete('/:songId', songController.deletesSongById)

router.delete('/:albumId/song', songController.deletesSongByAlbum);

module.exports = router;


