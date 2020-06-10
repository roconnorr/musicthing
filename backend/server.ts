/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const express = require('express');
const trackRoute = express.Router();
const cors = require('cors');

const db = require('better-sqlite3')('dev.db', { verbose: console.log });
const mm = require('music-metadata');

// create db schema
const createTrackTable = db.prepare(
  `
  CREATE TABLE IF NOT EXISTS tracks (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    year TEXT NOT NULL,
    path TEXT NOT NULL
  );
  `
);

createTrackTable.run();

const insertTrack = db.prepare(
  `INSERT INTO tracks (title, artist, year, path) VALUES (@title, @artist, @year, @path)`
);

// startup hax - read music dir and insert into the db
// TODO - store last updated time for file in db, check if it has changed and only update if it has

// get all file paths in music dir for parsing
const filePaths = fs.readdirSync('./music');

filePaths.forEach(path => {
  const fullPath = `./music/${path}`;
  mm.parseFile(fullPath)
    .then(metadata => {
      // console.log(util.inspect(metadata, { showHidden: false, depth: null }));
      const { title, artist, year } = metadata.common;

      console.log(title, artist, year);

      insertTrack.run({ title, artist, year, path: fullPath });
    })
    .catch(err => {
      console.error(err.message);
    });
});

/**
 * Create Express server and routes
 */
const app = express();
app.use(cors());
app.use('/track', trackRoute);

const getSong = db.prepare(`SELECT * FROM tracks where id = ?`);

/**
 * GET /tracks/:trackID
 */
trackRoute.get('/:trackID', (req, res) => {
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  const { trackID } = req.params;

  const song = getSong.get(trackID);

  if (!trackID || !song) {
    res.status(404).send('Track not found!');
  }

  const fileStream = fs.createReadStream(song.path);

  fileStream.on('error', err => {
    res.status(500).send(err);
  });

  fileStream.pipe(res);
});

const getAllSongs = db.prepare(`SELECT * FROM tracks`);

//getallsongs
trackRoute.get('/', (req, res) => {
  console.log('req');
  const songs = getAllSongs.all();
  console.log('req');

  res.json(songs);
});

//streamtest
trackRoute.get('/test', (req, res) => {
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  const fileStream = fs.createReadStream('./kaytestnada.mp3');

  fileStream.on('error', err => {
    res.status(500).send(err);
  });

  fileStream.pipe(res);
});

app.listen(3005, () => {
  console.log('Listening on port 3005');
});
