/* src/routes/artist.js */

const express = require('express');

const artistController = require('../controllers/artists');
const albumController = require('../controllers/albums');
const songController = require('../controllers/songs')

const router = express.Router();


router.post('/', artistController.createsArtist);

router.get('/',  artistController.listArtists);

router.get('/:artistId', artistController.getArtistById);

router.patch('/:artistId', artistController.updatesArtistById);

router.delete('/:artistId', artistController.deletesArtist);


router.post('/:artistId/albums', albumController.createAlbum);

router.get('/:artistId/albums', albumController.listAllAlbumsByArtist);


router.get('/:artistId/songs', songController.listSongsByArtist);

module.exports = router;
