import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { ListItem } from "@chakra-ui/core";

const Track = SortableElement(({ value, style }: any) => {
  return (
    <ListItem
      height={50}
      style={{...style, padding: "4px", }}
      
    //   p={2}
    //   m={2}
      backgroundColor="red.300"
    //   listStyleType="none"
    >
      {value}
    </ListItem>
  );
});

export default Track;
