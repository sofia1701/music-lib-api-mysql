/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album, Song } = require('../src/sequelize');

describe('/songs', () => {
  let artist;
  let album;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
      await Song.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      await Song.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
      album = await Album.create({
        name: 'InnerSpeaker',
        year: 2010,
        artistId: artist.id,
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /album/:albumId/song', () => {
    it('creates a new song under an album', (done) => {
      request(app)
        .post(`/albums/${album.id}/song`)
        .send({
          artist: artist.id,
          name: 'Solitude Is Bliss',
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          const songId = res.body.id;
          expect(res.body.id).to.equal(songId);
          expect(res.body.name).to.equal('Solitude Is Bliss');
          expect(res.body.artistId).to.equal(artist.id);
          expect(res.body.albumId).to.equal(album.id);
          done();
        });
    });
  });
  it('returns a 404 and does not create a song if the album does not exist', (done) => {
    request(app)
      .post('/albums/1234/song')
      .send({
        artist: artist.id,
        name: 'Solitude Is Bliss',
      })
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('The album could not be found.');

        Song.findAll().then((songs) => {
          expect(songs.length).to.equal(0);
          done();
        });
      });
  });
});
