import React, { Component, ReactElement, RefObject } from 'react';
import arrayMove from 'array-move';
import { SortableContainer, SortEnd } from 'react-sortable-hoc';
import { List, ListRowProps } from 'react-virtualized';
// @ts-ignore
import Player from 'react-howler-player';

import TrackTableItem, { Track } from './track/Track';

type VirtualListProps = {
  tracks: Track[];
  listRef: RefObject<List>;
};

class VirtualList extends Component<VirtualListProps, {}> {
  renderRow = ({ index, key, style }: ListRowProps): ReactElement => {
    const { tracks } = this.props;
    const track = tracks[index];

    return (
      <div key={key} style={style}>
        <TrackTableItem
          track={track}
          index={index}
          onClick={(id: number) => console.log('click' + id)}
        />
      </div>
    );
  };

  render(): ReactElement {
    const { tracks, listRef } = this.props;

    return (
      <List
        ref={listRef}
        rowHeight={58}
        rowRenderer={this.renderRow}
        rowCount={tracks.length}
        width={400}
        height={300}
      />
    );
  }
}

const SortableVirtualList = SortableContainer(VirtualList);

type TrackTableState = {
  items: Track[];
  playingTrack: Track | undefined;
};

class TrackTable extends Component<{}, TrackTableState> {
  listRef: RefObject<List>;

  constructor(props: {}) {
    super(props);
    this.listRef = React.createRef();

    this.state = {
      items: [],
      playingTrack: undefined
    };
  }

  async componentDidMount(): Promise<void> {
    const response = await fetch('http://localhost:3005/track');
    console.log(response);
    const data = await response.json();
    console.log(data);
    const tracks = data.map(
      (track: any) => new Track(track.id, track.title, track.artist, track.year)
    );
    console.log(tracks);
    this.setState({ items: tracks });
  }

  onSortEnd = ({ oldIndex, newIndex }: SortEnd): void => {
    if (oldIndex === newIndex) {
      return;
    }

    const { items } = this.state;

    this.setState({
      items: arrayMove(items, oldIndex, newIndex)
    });

    // Update the list via the ref
    this.listRef.current?.recomputeRowHeights();
  };

  render(): ReactElement {
    const { items } = this.state;

    return (
      <>
        <SortableVirtualList
          listRef={this.listRef}
          tracks={items}
          onSortEnd={this.onSortEnd}
        />
        <Player src={[items]} isDark={true} />
      </>
    );
  }
}

export default TrackTable;
