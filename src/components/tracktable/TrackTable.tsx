import React, { Component, ReactElement } from 'react';
import arrayMove from 'array-move';
import { SortableContainer } from 'react-sortable-hoc';
import { List } from 'react-virtualized';

import TrackTableItem, { Track } from './track/Track';

type VirtualListProps = {
  tracks: Track[];
  getRef: any;
};

class VirtualList extends Component<VirtualListProps, {}> {
  renderRow = ({ index, key, style }: any) => {
    const { tracks } = this.props;
    const track = tracks[index];

    return (
      <div key={key} style={style}>
        <TrackTableItem track={track} index={index} />
      </div>
    );
  };

  render(): ReactElement {
    const { tracks, getRef } = this.props;

    return (
      <List
        ref={getRef}
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
};

class TrackTable extends Component<{}, TrackTableState> {
  List: any;

  state = {
    items: [
      new Track('thingy1'),
      new Track('thingy2'),
      new Track('thingy3'),
      new Track('thingy4'),
      new Track('thingy5'),
      new Track('thingy6')
    ]
  };

  registerListRef = (listInstance: any) => {
    this.List = listInstance;
  };

  onSortEnd = ({ oldIndex, newIndex }: any) => {
    if (oldIndex === newIndex) {
      return;
    }

    const { items } = this.state;

    this.setState({
      items: arrayMove(items, oldIndex, newIndex)
    });

    // Update the list via the ref
    this.List.recomputeRowHeights();
  };

  render(): ReactElement {
    const { items } = this.state;

    return (
      <SortableVirtualList
        getRef={this.registerListRef}
        tracks={items}
        onSortEnd={this.onSortEnd}
      />
    );
  }
}

export default TrackTable;
