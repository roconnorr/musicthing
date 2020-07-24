import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { ListItem } from '@chakra-ui/core';
import { Track } from '../../../store/playlist/playlist';

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
