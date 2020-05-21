/* src/routes/album.js */

const express = require('express');

const albumController = require('../controllers/albums');
const songController = require('../controllers/songs')

const router = express.Router();

router.route('/:albumId')
  .patch(albumController.updateAlbumByID)
  .delete(albumController.deleteAlbumById);

router.route('/:albumId/songs')
  .post(songController.createSong)
  .get(songController.getSongsByAlbum)
  .patch(songController.updateSongByAlbum)
  .delete(songController.deleteSongByAlbum);

module.exports = router;


