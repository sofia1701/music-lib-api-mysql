/* src/routes/album.js */

const express = require('express');

const albumController = require('../controllers/albums');
const songController = require('../controllers/songs')

const router = express.Router();

router.patch('/:albumId', albumController.updatesAlbumByID);

router.delete('/:albumId', albumController.deletesAlbumById);


router.post('/:albumId/song', songController.createsSong);

router.get('/:albumId/songs', songController.listSongsByAlbum);

router.patch('/:albumId/song', songController.updatesSongByAlbum);

router.delete('/:albumId/song', songController.deletesSongByAlbum);

module.exports = router;


