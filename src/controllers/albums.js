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

exports.listAllAlbumsByArtist = (req, res) => {
  const { artistId } = req.params;
  Artist.findOne({ where: { id: artistId} })
  .then(artist => {
    if(!artist) {
      return res.status(404).json({ error: 'The artist could not be found.' });
    }else{
     Album.findAll({ where: { artistId} }).then(albums => res.status(200).json(albums));
    };
  })
};

exports.updatesAlbumByID = (req, res) => {
  const { albumId } = req.params;
  Album.update(req.body, {where: { id: albumId }})
  .then(([updatedAlbum]) => {
    if(!updatedAlbum) {
      return res.status(404).json({ error: 'The album could not be found' })
    }
    return res.status(200).json(updatedAlbum);
  })
}


