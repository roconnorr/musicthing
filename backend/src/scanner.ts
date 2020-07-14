import klaw, { Item } from 'klaw';
import through2 from 'through2';

import * as musicmetadata from 'music-metadata';
import * as mime from 'mime-types';

import chalk from 'chalk';

import { getSongByPath, insertTrack } from './database';

const isAudioType = (path: string) => {
  const mimeType = mime.lookup(path);
  return mimeType ? mimeType.includes('audio') : false;
};

// exclude directories and include files with an audio MIME type
const excludeDirFilter = through2.obj(function (item, _enc, next) {
  if (!item.stats.isDirectory() && isAudioType(item.path)) {
    this.push(item);
  }
  next();
});

export const scanTrackDirectory = async (path: string) => {
  klaw(path)
    .pipe(excludeDirFilter)
    .on('data', (item) => processTrack(item.path, item.stats.mtime))
    .on('error', (err: Error, item: Item) => {
      console.log(err.message);
      console.log(item.path);
    })
    .on('end', () => console.log('File scan complete'));
};

const processTrack = async (path: string, mtime: Date) => {
  try {
    const metadata = await musicmetadata.parseFile(path);
    // console.log(util.inspect(metadata, { showHidden: false, depth: null }));
    const { title, artist, year } = metadata.common;

    // check if a song exists for this file path already
    const song = getSongByPath.get(path);

    // Update the track record in the DB if the file has been modified since the last time we saw it
    // Insert the track record if it has not been seen before
    // TODO: add moment
    // TODO: store MIME type
    if (!song || new Date(song.lastUpdated) < mtime) {
      console.log(`Adding new track: ${title} - ${artist}`);
      insertTrack.run({
        title,
        artist,
        year,
        path,
        lastUpdated: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.log(chalk.red(`Error for file at ${path}`));
    console.log(chalk.red(e.message));
  }
};
