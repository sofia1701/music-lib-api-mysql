/* src/routes/artist.js */

const express = require('express');
const artistController = require('../controllers/artists');
const albumController = require('../controllers/albums');

const router = express.Router();


router.post('/', artistController.createsArtist);

router.get('/',  artistController.listArtists);

router.get('/:artistId', artistController.getArtistById);

router.patch('/:artistId', artistController.updatesArtistById);

router.delete('/:artistId', artistController.deletesArtist);


router.post('/:artistId/albums', albumController.createAlbum);

router.get('/:artistId/albums', albumController.listAllAlbumsByArtist);

router.patch('/:albumId/albums', albumController.updatesAlbumByID);

router.delete('/:albumId/albums', albumController.deletesAlbumById);


module.exports = router;
