/* eslint-disable @next/next/no-img-element */

/**
 * Renders a handshake animation with a loading indicator.
 *
 * This component displays an image of two hands shaking, with a blurred shadow
 * animation underneath. It also includes a "Handshake initiated" message and a
 * "Establishing a secure connection" message with a loading indicator.
 *
 * @returns {JSX.Element} The handshake component
 */
export default function HandShakeComponent() {
  return (
    <div className='relative flex flex-col justify-center items-center h-screen'>
      <div className='relative'>
        <div className='absolute inset-x-0 bottom-0 flex justify-center'>
          <div className='w-1/2 h-2 bg-black blur-sm rounded-full animate-shadow'></div>
        </div>
        <img
          src={'/assets/images/hands.png'}
          alt='handshake'
          className='animate-up-and-down'
        />
      </div>
      <div className='flex flex-col items-center pt-6 text-xl'>
        <span>Handshake initiated</span>
        <span>
          Establishing a secure connection<span className='dots'></span>
        </span>
      </div>
    </div>
  );
}
