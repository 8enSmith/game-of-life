import * as React from 'react';

const { useEffect, useRef } = React;

type IntervalFunction = () => unknown | void;

const useInterval = (callback: IntervalFunction, delay: number | null) => {
  const savedCallback = useRef<IntervalFunction | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};

export { useInterval };
