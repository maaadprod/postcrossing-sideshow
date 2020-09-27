import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import MasonryItem from './MasonryItem';

function Masonry(props) {
  const { data, gapVertical, gapHorizontal, column } = props;
  const [clientRect, setClientRect] = useState({});
  const [masonry, setMasonry] = useState({});
  const [heightContainer, setHeight] = useState(0);
  const [col, setCol] = useState(column);

  const _setClientRect = index => height => {
    setClientRect(rect => ({
      ...rect,
      [index]: height,
    }));
  };

  useEffect(() => {
    setCol(column);
  }, [column]);

  useEffect(() => {
    let columnHeights = new Array(col).fill(0);
    const widthRatio = 100 / col;
    const masonry = Object.keys(clientRect).reduce((obj, keyIndex) => {
      const height = clientRect[keyIndex];
      const minIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const top = columnHeights[minIndex];
      const left = `${widthRatio * minIndex}%`;
      columnHeights[minIndex] += height;
      return {
        ...obj,
        [keyIndex]: {
          top,
          left,
        },
      };
    }, {});
    const heightContainer = Math.max(...columnHeights);
    setHeight(heightContainer);
    setMasonry(masonry);
  }, [clientRect, col]);

  const renderItem = (item, index) => {
    return (
      <MasonryItem
        key={index.toString()}
        onLoadEnd={_setClientRect(index)}
        uri={item.image}
        column={col}
        containerStyle={{
          position: 'absolute',
          width: `${100 / col}%`,
          padding: `${gapVertical / 2}px ${gapHorizontal / 2}px`,
          ...(masonry[index]
            ? {
                top: masonry[index].top,
                left: masonry[index].left,
              }
            : {}),
        }}
      />
    );
  };

  const _handleChange = event => {
    const { currentTarget } = event;

    setCol(parseInt(currentTarget.value));
  };

  return (
    <div>
      <select
        onChange={_handleChange}
        style={{ marginBottom: 20 }}
        defaultValue={col}
      >
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <div
        className="container"
        style={{
          height: heightContainer,
          margin: `${-gapVertical / 2}px ${-gapHorizontal / 2}px`,
        }}
      >
        {data.map(renderItem)}
      </div>
    </div>
  );
}
export default Masonry;
