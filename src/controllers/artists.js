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
  Artist.findOne({ where: { id: artistId} })
  .then(artist => {
    if(!artist) {
      return res.status(404).json({ error: 'The artist could not be found.' });
    }
    return res.status(200).json(artist);
  });
};

exports.updatesArtistById = (req, res) => {
  const { artistId } = req.params;
  Artist.update(req.body, { where: { id: artistId } })
  .then(([updatedArtist]) => {
    if(!updatedArtist) {
      return res.status(404).json({ error: 'The artist could not be found.' });
    }
    return res.status(200).json(updatedArtist);
  });
};


/*When a return statement is used in a function body, 
the execution of the function is stopped. If specified, 
a given value is returned to the function caller.*/