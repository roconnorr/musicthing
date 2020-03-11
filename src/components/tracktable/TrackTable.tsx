import React, { Component } from "react";
import { SortableContainer } from "react-sortable-hoc";
import arrayMove from "array-move";
import { List } from "react-virtualized";

import Track from "./track/Track";

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

  //   getRowHeight = ({ index }: any) => {
  //     const { items } = this.props;
  //     return items[index].height;
  //   };

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
      { value: "0" },
      { value: "1" },
      { value: "2" },
      { value: "3" },
      { value: "4" },
      { value: "5" },
      { value: "6" },
      { value: "7" },
      { value: "8" }
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

    // We need to inform React Virtualized that the items have changed heights
    // This can either be done by imperatively calling the recomputeRowHeights and
    // forceUpdate instance methods on the `List` ref, or by passing an additional prop
    // to List that changes whenever the order changes to force it to re-render
    this.List.recomputeRowHeights();
    // this.List.forceUpdate();
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

// import React, {Component} from 'react';
// import {render} from 'react-dom';
// import {SortableContainer, SortableElement} from 'react-sortable-hoc';
// import arrayMove from 'array-move';
// import Infinite from 'react-infinite';

// const SortableItem = SortableElement(({height, value}: any) => {
//   return <li style={{height}}>{value}</li>;
// });

// const SortableInfiniteList = SortableContainer(({items}: any) => {
//   return (
//     <Infinite
//       containerHeight={400}
//       elementHeight={50}
//     >
//       {items.map(({value, height}: any, index: any) => (
//         <Track
//           key={`item-${value}`}
//           index={index}
//           value={value}
//           height={height}
//         />
//       ))}
//     </Infinite>
//   );
// });

// class TrackTable extends Component {
//   state = {
//     items: [
//       {value: 'Item 1', height: 89},
//       {value: 'Item 2', height: 59},
//       {value: 'Item 3', height: 130},
//       {value: 'Item 4', height: 59},
//       {value: 'Item 5', height: 200},
//       {value: 'Item 6', height: 150},
//       {value: 'Item 1', height: 89},
//       {value: 'Item 2', height: 59},
//       {value: 'Item 3', height: 130},
//       {value: 'Item 4', height: 59},
//       {value: 'Item 5', height: 200},
//       {value: 'Item 6', height: 150},
//       {value: 'Item 1', height: 89},
//       {value: 'Item 2', height: 59},
//       {value: 'Item 3', height: 130},
//       {value: 'Item 4', height: 59},
//       {value: 'Item 5', height: 200},
//       {value: 'Item 6', height: 150},
//       {value: 'Item 1', height: 89},
//       {value: 'Item 2', height: 59},
//       {value: 'Item 3', height: 130},
//       {value: 'Item 4', height: 59},
//       {value: 'Item 5', height: 200},
//       {value: 'Item 6', height: 150},
//       {value: 'Item 1', height: 89},
//       {value: 'Item 2', height: 59},
//       {value: 'Item 3', height: 130},
//       {value: 'Item 4', height: 59},
//       {value: 'Item 5', height: 200},
//       {value: 'Item 6', height: 150},
//       {value: 'Item 1', height: 89},
//       {value: 'Item 2', height: 59},
//       {value: 'Item 3', height: 130},
//       {value: 'Item 4', height: 59},
//       {value: 'Item 5', height: 200},
//       {value: 'Item 6', height: 150},
//       {value: 'Item 1', height: 89},
//       {value: 'Item 2', height: 59},
//       {value: 'Item 3', height: 130},
//       {value: 'Item 4', height: 59},
//       {value: 'Item 5', height: 200},
//       {value: 'Item 6', height: 150},
//       {value: 'Item 1', height: 89},
//       {value: 'Item 2', height: 59},
//       {value: 'Item 3', height: 130},
//       {value: 'Item 4', height: 59},
//       {value: 'Item 5', height: 200},
//       {value: 'Item 6', height: 150},
//     ],
//   };

//   onSortEnd = ({oldIndex, newIndex}: any) => {
//     this.setState(({items}: any) => ({
//       items: arrayMove(items, oldIndex, newIndex),
//     }));
//   };

//   render() {
//     const {items} = this.state;

//     return <SortableInfiniteList items={items} onSortEnd={this.onSortEnd} />;
//   }
// }

export default TrackTable;
