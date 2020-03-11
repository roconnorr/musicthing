import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { ListItem } from '@chakra-ui/core';

export class Track {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

type TrackItemProps = {
  track: Track;
};

const TrackTableItem = SortableElement(({ track }: TrackItemProps) => {
  return (
    <ListItem
      height={50}
      style={{ padding: '4px' }}
      backgroundColor="red.300"
      listStyleType="none"
    >
      {track.name}
    </ListItem>
  );
});

export default TrackTableItem;
