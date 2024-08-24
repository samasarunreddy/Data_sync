/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

export default function ServerProgress({ message, instance, percentage }) {
  const [size, setSize] = useState(0);

  const radius = `calc(${size}px * 0.405)`;
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

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div
        className='flex justify-center items-center relative'
        style={{ width: size, height: size }}
      >
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
        <div
          style={{
            background: `conic-gradient(
              #808080 ${percentage * 3.6}deg,
              #ffffff ${percentage * 3.6}deg 360deg
            )`,
            transform: 'rotate(-90deg)',
            width: '70%',
            height: '70%',
          }}
          className='absolute bg-white w-[70%] h-[70%] rounded-full flex flex-col justify-center p-1'
        >
          <div className='flex flex-col items-center justify-center bg-form-bg-color rounded-full w-full h-full rotate-90'>
            <span>{message ?? 'hi'}</span>
            <span className='text-3xl'>{percentage}%</span>
            <span className='text-xl pt-2'>{instance ?? '100/100'}</span>
          </div>
        </div>
        <div
          className='absolute'
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
      </div>
    </div>
  );
}
