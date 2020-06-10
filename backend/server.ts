import fs from 'fs';

import express from 'express';
import cors from 'cors';

import database from 'better-sqlite3';
import * as musicmetadata from 'music-metadata';

// init database
const db = database('dev.db', { verbose: console.log });

// create schema
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

// db queries
const getSong = db.prepare(`SELECT * FROM tracks where id = ?`);
const getAllSongs = db.prepare(`SELECT * FROM tracks`);
const insertTrack = db.prepare(
  `INSERT INTO tracks (title, artist, year, path) VALUES (@title, @artist, @year, @path)`
);

// startup hax - read music dir and insert into the db
// TODO - store last updated time for file in db, check if it has changed and only update if it has

// get all file paths in music dir for parsing
const filePaths = fs.readdirSync('./music');

filePaths.forEach(path => {
  const fullPath = `./music/${path}`;
  musicmetadata
    .parseFile(fullPath)
    .then(metadata => {
      // console.log(util.inspect(metadata, { showHidden: false, depth: null }));
      const { title, artist, year } = metadata.common;

      // console.log(title, artist, year);

      insertTrack.run({ title, artist, year, path: fullPath });
    })
    .catch(err => {
      console.error(err.message);
    });
});

// Create Express server and routes
const app = express();
const trackRoute = express.Router();

// middleware
app.use(cors());

// routes
app.use('/tracks', trackRoute);

/**
 * GET /tracks/:trackID
 */
trackRoute.get('/:trackID', (req, res) => {
  const { trackID } = req.params;

  const song = getSong.get(trackID);

  if (!trackID || !song) {
    res.status(404).send('Track not found!');
  }

  console.log(req);
  console.log(song);

  const fileStream = fs.createReadStream(song.path);

  fileStream.on('error', err => {
    res.status(500).send(err);
  });

  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');
  fileStream.pipe(res);
});

/**
 * GET /tracks
 */
trackRoute.get('/', (req, res) => {
  const songs = getAllSongs.all();

  res.json(songs);
});

app.listen(3005, () => {
  console.log('Listening on port 3005');
});
