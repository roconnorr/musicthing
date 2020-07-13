import fs from 'fs';
import * as musicmetadata from 'music-metadata';

import { getSongByPath, insertTrack } from './database';

export const scanMusicFolder = (path: string) => {
  // get all file paths in music dir for parsing
  const filePaths = fs.readdirSync(path);

  filePaths.forEach((trackPath) => {
    const fullPath = `${path}${trackPath}`;
    musicmetadata
      .parseFile(fullPath)
      .then((metadata) => {
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
            lastUpdated: new Date().toISOString(),
          });
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  });
};
