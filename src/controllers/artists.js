/* src/controllers/artist.js */

const { Artist } = require('../sequelize');

exports.create = (req, res) => {
  Artist.create(req.body).then(user => res.status(201).json(user));
};
