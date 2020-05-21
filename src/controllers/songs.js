/* src/controllers/songs.js */
const { Artist, Album, Song } = require('../sequelize');

exports.createSong = (req, res) => {
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

exports.getSongsByAlbum = (req,res) => {
  const { albumId } = req.params;
  Album.findByPk(albumId).then(album => {
    if(!album) {
      return res.status(404).json({ error: 'The album could not be found.' });
    }else{
      Song.findAll({ 
        include: [
          { model: Album, as: 'album', where: {id: albumId} }, 
          { model: Artist, as: 'artist', where: {id: album.artistId} }
        ] 
      })
      .then(songs => {return res.status(200).json(songs)});
    };
  })
};

exports.getSongsByArtist = (req, res) => {
  const { artistId } = req.params;
  Artist.findByPk(artistId).then(artist => {
    if(!artist) {
      return res.status(404).json({ error: 'The artist could not be found.' });
    }else{
      Song.findAll({ include: [{ model: Artist, as: 'artist', where: {id: artistId} }] })
      .then(songs => {return res.status(200).json(songs)});
    };
  })
}

exports.updateSongByAlbum = (req,res) => {
  const { albumId } = req.params;
  Album.findByPk(albumId).then(album => {
    if(!album) {
      return res.status(404).json({ error: 'The album could not be found.' });
    }else{
      Song.update(req.body, { where: {albumId} })
      .then(updatedSong => {return res.status(200).json(updatedSong)});
    };
  })
};

exports.updateSongById = (req, res) => {
  const { songId } = req.params;
  Song.findByPk(songId).then(song => {
    if(!song) {
      return res.status(404).json({ error: 'The song could not be found.' });
    }else{
      Song.update(req.body, { where: {id: songId} })
      .then(updatedSong => {return res.status(200).json(updatedSong)});
    };
  })
}

exports.deleteSongById = (req, res) => {
  const { songId } = req.params;
  Song.findByPk(songId).then(song => {
    if(!song) {
      return res.status(404).json({ error: 'The song could not be found.' });
    }else{
      Song.destroy({ where: {id: songId} })
      .then(deletedSong => {return res.status(204).json(deletedSong)});
    };
  })
};

exports.deleteSongByAlbum = (req, res) => {
  const { albumId } = req.params;
  Album.findByPk(albumId).then(album => {
    if(!album) {
      return res.status(404).json({ error: 'The album could not be found.' });
    }else{
      Song.destroy({ where: {albumId} })
      .then(deletedSong => {return res.status(204).json(deletedSong)});
    };
  })
};