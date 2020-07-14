import React, { Component, ReactElement, RefObject } from 'react';
import arrayMove from 'array-move';
import { SortableContainer, SortEnd } from 'react-sortable-hoc';
import { List, ListRowProps } from 'react-virtualized';

import TrackTableItem, { Track } from './track/Track';
import { addTrack } from '../../store/playlist/playlist';
import { store } from '../../store/createStore';

type VirtualListProps = {
  tracks: Track[];
  listRef: RefObject<List>;
  onClickRow: (id: number) => void;
};

class VirtualList extends Component<VirtualListProps, {}> {
  handleClickRow = (id: number): void => {
    this.props.onClickRow(id);
  };

  renderRow = ({ index, key, style }: ListRowProps): ReactElement => {
    const { tracks } = this.props;
    const track = tracks[index];

    return (
      <div key={key} style={style}>
        <TrackTableItem
          track={track}
          index={index}
          onClick={(id: number): void => this.handleClickRow(id)}
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
  playingTrackId: number;
};

class TrackTable extends Component<{}, TrackTableState> {
  listRef: RefObject<List>;

  constructor(props: {}) {
    super(props);
    this.listRef = React.createRef();

    this.state = {
      items: [],
      playingTrackId: 0
    };
  }

  async componentDidMount(): Promise<void> {
    const response = await fetch('http://localhost:3005/tracks');
    console.log(response);
    const data = await response.json();
    console.log(data);
    // test hax: move this fetching and redux logic out of here
    const tracks = data.map((track: any) => {
      const track2 = new Track(track.id, track.title, track.artist, track.year);
      store.dispatch(addTrack(track2));
      return track2;
    });
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
      <SortableVirtualList
        listRef={this.listRef}
        tracks={items}
        onSortEnd={this.onSortEnd}
        onClickRow={(id: number): void => {
          this.setState({
            playingTrackId: id
          });
        }}
      />
    );
  }
}

export default TrackTable;
