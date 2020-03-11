import React, { Component, ReactElement, RefObject } from 'react';
import arrayMove from 'array-move';
import { SortableContainer, SortEnd } from 'react-sortable-hoc';
import { List, ListRowProps } from 'react-virtualized';

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
        <TrackTableItem track={track} index={index} />
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
};

class TrackTable extends Component<{}, TrackTableState> {
  listRef: RefObject<List>;

  constructor(props: {}) {
    super(props);
    this.listRef = React.createRef();
    this.state = {
      items: [
        new Track('thingy1'),
        new Track('thingy2'),
        new Track('thingy3'),
        new Track('thingy4'),
        new Track('thingy5'),
        new Track('thingy6')
      ]
    };
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
      />
    );
  }
}

export default TrackTable;
