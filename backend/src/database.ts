import database from 'better-sqlite3';
import chalk from 'chalk';

// init database and schema
const db = database('dev.db', {
  verbose: (msg: string) => console.log(chalk.yellow(`${msg}\n`)),
});

// schema
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
export const getSong = db.prepare(`SELECT * FROM tracks where id = ?`);
export const getSongByPath = db.prepare(`SELECT * FROM tracks where path = ?`);
export const getAllSongs = db.prepare(`SELECT * FROM tracks`);
export const insertTrack = db.prepare(
  `INSERT INTO tracks (title, artist, year, path, lastUpdated) VALUES (@title, @artist, @year, @path, @lastUpdated)`
);
