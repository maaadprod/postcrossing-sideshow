import React, { useRef, useEffect } from 'react';

function MasonryItem({ uri, containerStyle, onLoadEnd, column }) {
  const onLoadEndRef = useRef(onLoadEnd);
  const divRef = useRef(null);
  const _handleLoad = () => {
    if (divRef.current) {
      const { height } = divRef.current.getBoundingClientRect();
      onLoadEndRef.current(height);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      _handleLoad();
    }, 200);
  }, [column]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      const { height } = divRef.current.getBoundingClientRect();
      onLoadEndRef.current(height);
    });
  }, []);

  return (
    <div
      style={containerStyle}
      className="image-container"
      ref={divRef}
      onLoad={_handleLoad}
    >
      <img src={uri} className="image" alt="1111" />
    </div>
  );
}

export default MasonryItem;
