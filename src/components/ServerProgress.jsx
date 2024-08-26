/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

/**
 * Renders a progress indicator for a server operation.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.message] - The message to display.
 * @param {string} [props.instance] - The instance information to display.
 * @param {number} props.percentage - The progress percentage to display.
 * @returns {JSX.Element} The progress indicator component.
 */

export default function ServerProgress({
  message,
  instance,
  percentage,
  completed,
  transMessage,
  transMessage1,
}) {
  const [size, setSize] = useState(0);

  const rocketHeight = `5rem`;

  useEffect(() => {
    const updateSize = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      setSize(minDimension);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getRadius = () => {
    const width = window.innerWidth;

    if (width >= 2560) {
      return `calc(${size}px * 0.374)`;
    } else if (width >= 1920) {
      return `calc(${size}px * 0.389)`;
    } else if (width >= 1600) {
      return `calc(${size}px * 0.39)`;
    } else if (width >= 1440) {
      return `calc(${size}px * 0.3925)`;
    } else if (width >= 1366) {
      return `calc(${size}px * 0.396)`;
    } else if (width >= 1024) {
      return `calc(${size}px * 0.397)`;
    }
  };

  const radius = getRadius();

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div
        className='flex justify-center items-center relative'
        style={{ width: size, height: size }}
      >
        {/*Left and right server */}
        <div className='relative z-10 flex justify-between items-center w-full'>
          <img
            src='/assets/images/serverLeft.png'
            alt='server-left'
            className='relative z-20 h-[calc(100vh-60vh)]'
          />
          <img
            src='/assets/images/serverRight.png'
            alt='server-right'
            className='relative z-20 h-[calc(100vh-60vh)]'
          />
        </div>

        {/*Percentages and instances */}
        <div
          style={{
            background: `conic-gradient(
              #39F349 ${percentage * 3.6}deg,
              #ffffff ${percentage * 3.6}deg 360deg
            )`,
            transform: 'rotate(-90deg)',
            width: '70%',
            height: '70%',
          }}
          className='absolute bg-white w-[70%] h-[70%] rounded-full flex flex-col justify-center p-1'
        >
          <div className='flex flex-col items-center justify-center bg-form-bg-color rounded-full w-full h-full rotate-90'>
            <span>{transMessage}</span>
            <span>{transMessage1}</span>
            <span className='w-1/2 text-center font-medium'>{message}</span>
            <span className='text-3xl'>
              {percentage ? `${percentage}%` : ''}
            </span>
            <span className='text-xl pt-2'>{instance}</span>
          </div>
        </div>

        {/*Rocket animation*/}
        {completed ? (
          <div className='absolute transition-transform duration-1000 ease-in-out pb-[11rem]'>
            <img
              src='/assets/images/rocket.png'
              alt='rocket'
              className='w-[5rem]'
            />
          </div>
        ) : (
          <div
            className='absolute transition-transform duration-1000 ease-in-out'
            style={{
              transform: `rotate(${
                90 + (percentage * 360) / 100
              }deg) translateY(calc(${radius} - (${rocketHeight} / 2)))`,
            }}
          >
            <img
              src='/assets/images/rocket.png'
              alt='rocket'
              className='w-[5rem] rotate-[270deg]'
            />
          </div>
        )}
      </div>
    </div>
  );
}
