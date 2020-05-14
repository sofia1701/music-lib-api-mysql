/* src/controllers/artist.js */

const { Artist } = require('../sequelize');

exports.create = (req, res) => {
  Artist.create(req.body).then(user => res.status(201).json(user));
};

exports.listArtists = (req, res) => {
  Artist.findAll().then(artists => res.status(200).json(artists));
};

exports.getArtistById = (req, res) => {
  const { artistId } = req.params;
  Artist.findByPk(artistId).then(artist => {
    res.status(200).json(artist);
  });
};
