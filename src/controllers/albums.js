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
        return album.setArtist(artistId)
        .then(savedAlbum => {
          return res.status(201).json(savedAlbum);
        });
     });
    }
  })  
};

exports.listAllAlbums = (req, res) => {
  //const { artistId } = req.params;
  Album.findAll().then(albums => res.status(200).json(albums));
}

exports.listAlbumsByArtistId = (req, res) => {
  const { artistId } = req.params;
  Album.findOne({ where: { artistId} })
  .then(albums => res.status(200).json(albums));     
};