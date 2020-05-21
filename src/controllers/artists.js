/* src/controllers/artist.js */

const { Artist } = require('../sequelize');

exports.createArtist = (req, res) => {
  Artist.create(req.body).then(artist => res.status(201).json(artist));
};

exports.getArtists = (req, res) => {
  Artist.findAll().then(artists => res.status(200).json(artists));
};

exports.getArtistById = (req, res) => {
  const { artistId } = req.params;
  Artist.findOne({ where: { id: artistId} })
  .then(artist => {
    if(!artist) {
      return res.status(404).json({ error: 'The artist could not be found.' });
    }
    return res.status(200).json(artist);
  });
};

exports.updateArtistById = (req, res) => {
  const { artistId } = req.params;
  Artist.update(req.body, { where: { id: artistId } })
  .then(([updatedArtist]) => {
    if(!updatedArtist) {
      return res.status(404).json({ error: 'The artist could not be found.' });
    }
    return res.status(200).json(updatedArtist);
  });
};

exports.deleteArtist = (req, res) => {
  const { artistId } = req.params;
  Artist.destroy({ where: { id: artistId } })
  .then(deletedArtist => {
    if(!deletedArtist) {
      return res.status(404).json({ error: 'The artist could not be found.' })
    }
    return res.status(204).json(deletedArtist);
  })
};
