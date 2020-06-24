import fs from 'fs';

import express from 'express';
import cors from 'cors';

import database from 'better-sqlite3';
import * as musicmetadata from 'music-metadata';

// init database
const db = database('dev.db', {
  verbose: (msg: string) => console.log(`${msg}\n`)
});

// create schema
const createTrackTable = db.prepare(
  `
  CREATE TABLE IF NOT EXISTS tracks (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    year TEXT NOT NULL,
    path TEXT NOT NULL,
    lastUpdated TEXT NOT NULL
  );
  `
);
createTrackTable.run();

// db queries
const getSong = db.prepare(`SELECT * FROM tracks where id = ?`);
const getSongByPath = db.prepare(`SELECT * FROM tracks where path = ?`);
const getAllSongs = db.prepare(`SELECT * FROM tracks`);
const insertTrack = db.prepare(
  `INSERT INTO tracks (title, artist, year, path, lastUpdated) VALUES (@title, @artist, @year, @path, @lastUpdated)`
);

// startup hax - read music dir and insert into the db
// TODO - store last updated time for file in db, check if it has changed and only update if it has

// get all file paths in music dir for parsing
const filePaths = fs.readdirSync(__dirname + '/music');

filePaths.forEach(path => {
  const fullPath = `${__dirname}/music/${path}`;
  musicmetadata
    .parseFile(fullPath)
    .then(metadata => {
      // console.log(util.inspect(metadata, { showHidden: false, depth: null }));
      const { title, artist, year } = metadata.common;

      const stat = fs.statSync(fullPath);
      const song = getSongByPath.get(fullPath);

      // Update the track record in the DB if the file has been modified since the last time we saw it
      // Insert the track record if it has not been seen before
      if (!song || new Date(song.lastUpdated) < new Date(stat.mtime)) {
        insertTrack.run({
          title,
          artist,
          year,
          path: fullPath,
          lastUpdated: new Date().toISOString()
        });
      }
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
