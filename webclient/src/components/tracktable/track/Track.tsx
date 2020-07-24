import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { ListItem } from '@chakra-ui/core';

export class Track {
  id: number;
  name: string;
  artist: string;
  year: string;

  constructor(id: number, name: string, artist: string, year: string) {
    this.id = id;
    this.name = name;
    this.artist = artist;
    this.year = year;
  }
}

type TrackItemProps = {
  track: Track;
  onClick: (track: Track) => void;
};

const TrackTableItem = SortableElement(({ track, onClick }: TrackItemProps) => {
  return (
    <ListItem
      height={50}
      style={{ padding: '4px' }}
      backgroundColor="red.300"
      listStyleType="none"
    >
      {`${track.name} - ${track.artist} - ${track.year} `}
      <button onClick={(): void => onClick(track)}>⏯</button>
    </ListItem>
  );
});

export default TrackTableItem;
