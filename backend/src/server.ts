import fs from 'fs';

import express from 'express';
import cors from 'cors';

import chalk from 'chalk';
import arg from 'arg';

import { getSong, getAllSongs } from './database';
import { scanTrackDirectory } from './scanner';

import packageJSON from '../package.json';
const HELP_ARG = '--help';
const VERSION_ARG = '--version';
const SCAN_ARG = '--scan';
const DIR_ARG = '--dir';

const args = arg({
  // Arguments
  '--help': Boolean,
  '--version': Boolean,
  '--scan': Boolean,
  '--dir': String,
  // '--port':    Number,      // --port <number> or --port=<number> TODO: add port option

  // Aliases
  '-h': '--help',
  '-v': '--version',
  '-s': '--scan',
  '-d': '--dir',
});

if (args[HELP_ARG] === true) {
  console.log(`
${chalk.green(`musicthing server - version ${packageJSON.version}`)}

  Options
    --help, -h      Display this message

    --version, -v   Print version string

    --scan, -s      Rescan library on startup

    --dir, -d       Specify the directory to scan
  `);
  process.exit(0);
}

if (args[VERSION_ARG] === true) {
  console.log(packageJSON.version);
  process.exit(0);
}

if (args[SCAN_ARG] === true) {
  // TODO: refactor this so if the scan arg is passed it will check all existing files in db
  // TODO: wait until the scan is complete to start the server
  scanTrackDirectory(args[DIR_ARG] ?? '../testmusic');
}

// Create Express server and routes
const app = express();
app.disable('x-powered-by');
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

  // console.log(req);
  // console.log(song);

  const fileStream = fs.createReadStream(song.path);

  fileStream.on('error', (err) => {
    res.status(500).send(err);
  });

  // TODO: MIME type lookup on insert for res
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
  console.log(chalk.red.bold('Listening on port 3005'));
});
