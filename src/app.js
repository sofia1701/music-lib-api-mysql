const express = require('express');

const artistRouter = require('./routes/artist');
//const albumRouter = require('./routes/album');

const app = express();

app.use(express.json());

app.use('/artists', artistRouter);
//app.use('/albums', albumRouter);

module.exports = app;



//docker run -d -p 3306:3306 --name music_library_mysql -e MYSQL_ROOT_PASSWORD=super mysql
//docker start music_library_mysql