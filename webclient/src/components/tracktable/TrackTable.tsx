import React, { Component, ReactElement, RefObject } from 'react';
import arrayMove from 'array-move';
import { SortableContainer, SortEnd } from 'react-sortable-hoc';
import { List, ListRowProps } from 'react-virtualized';
import { connect } from 'react-redux';

import TrackTableItem from './track/Track';
import {
  Track,
  addTrack,
  selectAll,
  setAllTracks
} from '../../store/playlist/playlist';
import { setPlayingTrack } from '../../store/nowPlaying/nowPlaying';
import { RootState, store } from '../../store/createStore';

type VirtualListProps = {
  tracks: Track[];
  listRef: RefObject<List>;
  onClickRow: (track: Track) => void;
};

class VirtualList extends Component<VirtualListProps, {}> {
  handleClickRow = (track: Track): void => {
    this.props.onClickRow(track);
  };

  renderRow = ({ index, key, style }: ListRowProps): ReactElement => {
    const { tracks } = this.props;
    const track = tracks[index];

    return (
      <div key={key} style={style}>
        <TrackTableItem
          track={track}
          index={index}
          onClick={(track: Track): void => this.handleClickRow(track)}
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
        width={600}
        height={400}
      />
    );
  }
}

const SortableVirtualList = SortableContainer(VirtualList);

type StateProps = {
  tracks: Track[];
};

type DispatchProps = {
  setAllTracks: any;
  setPlayingTrack: any;
  addTrack: any;
};

type TrackTableProps = StateProps & DispatchProps;

class TrackTable extends Component<TrackTableProps, {}> {
  listRef: RefObject<List>;

  constructor(props: TrackTableProps) {
    super(props);
    this.listRef = React.createRef();
  }

  async componentDidMount(): Promise<void> {
    const response = await fetch('http://localhost:3005/tracks');
    console.log(response);
    const data = await response.json();
    console.log(data);
    // test hax: move this fetching and redux logic out of here
    const tracks = data.map((track: any) => {
      const track2 = {
        id: track.id,
        name: track.title,
        artist: track.artist,
        year: track.year
      };
      console.log('hurr');
      this.props.addTrack(track2);
      return track2;
    });
  }

  onSortEnd = ({ oldIndex, newIndex }: SortEnd): void => {
    if (oldIndex === newIndex) {
      return;
    }

    const { tracks, setAllTracks } = this.props;

    store.dispatch(setAllTracks(arrayMove(tracks, oldIndex, newIndex)));

    // Update the list via the ref
    this.listRef.current?.recomputeRowHeights();
  };

  render(): ReactElement {
    const { tracks, setPlayingTrack } = this.props;

    return (
      <SortableVirtualList
        listRef={this.listRef}
        tracks={tracks}
        onSortEnd={this.onSortEnd}
        onClickRow={(track: Track): void => {
          setPlayingTrack(track);
        }}
      />
    );
  }
}

const mapState = (state: RootState): StateProps => {
  return {
    tracks: selectAll(state.playlist)
  };
};

const mapDispatch = {
  addTrack,
  setPlayingTrack,
  setAllTracks
};

export default connect(mapState, mapDispatch)(TrackTable);
