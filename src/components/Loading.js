import React, { useEffect, useRef } from 'react';

export default function Loading({ realLoading, onLoaded }) {
  const loadingContainerRef = useRef(null);
  let number = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      number++;
      loadingContainerRef.current.innerText = number;
      if (number >= 100) {
        clearInterval(interval);
        onLoaded();
      }
    }, 15);
  }, []);

  return (
    <div className={`loading-container`} ref={loadingContainerRef}>
      {number}
    </div>
  );
}
