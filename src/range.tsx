import * as React from 'react';
import { useEffect, useState } from 'react';
import { Range } from 'react-range';
import uniqid from 'uniqid';

const FIVE_SECONDS = 5000;
const FIFTY_MILLISECONDS = 50;
const TEN_MILLISECONDS = 10;

interface ISimpleRangeProps {
  setTimeoutInterval: (value: number) => void;
}

const SimpleRange = (simpleRangeProps: ISimpleRangeProps) => {
  const [values, setValues] = useState([2500]);
  const [thumbValue, setThumbValue] = useState(0);
  useEffect(() => {
    simpleRangeProps.setTimeoutInterval(thumbValue);
  }, [simpleRangeProps, thumbValue]);

  return (
    <Range
      step={TEN_MILLISECONDS}
      min={FIFTY_MILLISECONDS}
      max={FIVE_SECONDS}
      values={values}
      onChange={(values) => setValues(values)}
      renderTrack={({ props, children }) => {
        return (
          <div
            key={uniqid()}
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '25%',
              backgroundColor: '#ccc',
            }}
          >
            {children}
          </div>
        );
      }}
      renderThumb={({ props, value, index }) => {
        setThumbValue(value);

        const { key, ...propsMinusKey } = props;

        return (
          <>
            <div
              key={index}
              {...propsMinusKey}
              style={{
                ...props.style,
                height: '12px',
                width: '12px',
                backgroundColor: '#999',
              }}
            />
            <p>{`${value} ms`}</p>
          </>
        );
      }}
    />
  );
};

export default SimpleRange;
