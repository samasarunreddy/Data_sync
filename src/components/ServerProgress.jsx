'use client';

import { useEffect, useState } from 'react';

export default function ServerProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = (prev + 1) % 100;
        return newProgress;
      });
    }, 40); // Adjust timing as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-2/3 relative'>
      {/* Circular Background */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='w-[50rem] h-[50rem] bg-white rounded-full flex justify-center items-center'>
          <div className='w-[48rem] h-[48rem] bg-form-bg-color rounded-full absolute'></div>
        </div>
      </div>

      {/* Images */}
      <div
        className='relative z-10 flex justify-between items-center w-full'
        style={{ '--progress': `${progress}%` }}
      >
        <img
          src='/assets/images/serverLeft.png'
          alt='server-left'
          className='relative z-20'
        />
        <img
          src='/assets/images/serverRight.png'
          alt='server-right'
          className='relative z-20'
        />
      </div>

      {/* Rocket Animation */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='rocket-container'>
          <img
            src='/assets/images/rocket.png'
            alt='rocket'
            className='w-[9rem] rocket-image'
          />
        </div>
      </div>
    </div>
  );
}
