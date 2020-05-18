const { Artist } = require('../sequelize')
const { Album } = require('../sequelize');
const { Song } = require('../sequelize');

exports.createsSong = (req, res) => {
  const { albumId } = req.params;
  const { artistId } = req.body;

  Album.findByPk(albumId).then((album) => {
    if (!album) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      const songData = {
        name: req.body.name,
        album: {
          artistId: album.artistId,
          name: album.name,
          year: album.year,
        }
      };
      Song.create(songData, {include: [ { model: Artist, as: 'artist' }, { model: Album, as: 'album' }  ]}).then((song) => {
        res.status(201).json(song);
      });
    }
  });
 
};


