/* src/controllers/songs.js */

const { Album } = require('../sequelize');
const { Song } = require('../sequelize');

exports.createsSong = (req, res) => {
  const { albumId } = req.params;

  Album.findByPk(albumId).then((album) => {
    if (!album) {
      return res.status(404).json({ error: 'The album could not be found.' });
    } else {
      const songData = {
        name: req.body.name,
        albumId: album.id,
        artistId: album.artistId,
      };
      Song.create(songData).then(song => {
        return res.status(201).json(song);
      })
    }
  });
 
};

exports.listSongsByAlbum = (req,res) => {
  const { albumId } = req.params;
  Album.findByPk(albumId).then(album => {
    if(!album) {
      return res.status(404).json({ error: 'The album could not be found.' });
    }else{
      Song.findAll({ where: {albumId} })
      .then(songs => res.status(200).json(songs));
    };
  })
};

exports.updatesSongByAlbum = (req,res) => {
  const { albumId } = req.params;
  Album.findByPk(albumId).then(album => {
    if(!album) {
      return res.status(404).json({ error: 'The album could not be found.' });
    }else{
      Song.update(req.body, { where: {albumId} })
      .then(updatedSong => res.status(200).json(updatedSong));
    };
  })
}


