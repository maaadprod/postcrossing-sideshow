import React from 'react';
import Masonry from "./Masonry/Masonry";
import useMedia from "../hooks/useMedia";

function List({ images }) {

  const columnCount = useMedia(
    // Media queries
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    // Column counts (relates to above media queries by array index)
    [5, 4, 3],
    // Default column count
    2
  );
  
  return <Masonry
        data={images}
        column={columnCount}
        gapVertical={20}
        gapHorizontal={20}
      />;
  }

export default List;
