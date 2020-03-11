import React, { Component } from 'react';
import arrayMove from 'array-move';
import { SortableContainer } from 'react-sortable-hoc';
import { List } from 'react-virtualized';

import Track from './track/Track';

class VirtualList extends Component<any, any> {
  renderRow = ({ index, key, style }: any) => {
    const { items } = this.props;
    const { value } = items[index];

    return (
      <div key={key} style={style}>
        <Track value={value} index={index} />
      </div>
    );
  };

  render() {
    const { items, getRef } = this.props;

    return (
      <List
        ref={getRef}
        rowHeight={58}
        rowRenderer={this.renderRow}
        rowCount={items.length}
        width={400}
        height={300}
      />
    );
  }
}

const SortableVirtualList = SortableContainer(VirtualList);

class TrackTable extends Component {
  List: any;

  state = {
    items: [
      { value: '0' },
      { value: '1' },
      { value: '2' },
      { value: '3' },
      { value: '4' },
      { value: '5' },
      { value: '6' },
      { value: '7' },
      { value: '8' }
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

  render() {
    const { items } = this.state;

    return (
      <SortableVirtualList
        getRef={this.registerListRef}
        items={items}
        onSortEnd={this.onSortEnd}
      />
    );
  }
}

export default TrackTable;
