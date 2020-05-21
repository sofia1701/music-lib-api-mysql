/* src/routes/artist.js */

const express = require('express');

const artistController = require('../controllers/artists');
const albumController = require('../controllers/albums');
const songController = require('../controllers/songs')

const router = express.Router();


router.route('/')
  .post(artistController.createArtist)
  .get(artistController.getArtists);

router.route('/:artistId')
  .get(artistController.getArtistById)
  .patch(artistController.updateArtistById)
  .delete(artistController.deleteArtist);

router.route('/:artistId/albums')
  .post(albumController.createAlbum)
  .get(albumController.getAlbumsByArtist);

router.route('/:artistId/songs').get(songController.getSongsByArtist);

module.exports = router;
