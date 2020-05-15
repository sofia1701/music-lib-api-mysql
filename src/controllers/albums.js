/* src/controllers/album.js */

const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');

exports.createAlbum = (req, res) => {
  const { artistId } = req.params;
  Artist.findOne({ where: { id: artistId} })
  .then(artist => {
    if(!artist) {
      return res.status(404).json({ error: 'The artist could not be found.' });
    }else{
      Album.create(req.body)
      .then(album => {
        album.setArtist(artistId)
        .then(linkedAlbum => {
          res.status(201).json(linkedAlbum);
        });
     });
    }
  })
  
}