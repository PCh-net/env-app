import React from 'react';

const MiniButton = ({ size = 'text-md', fullWidth = false, ...props }) => {
  const buttonClasses = `
    ${size}
    ${fullWidth ? 'w-full' : ''}
    text-lime-100
    hover:text-lime-200
    bg-gradient-to-br from-lime-700 via-lime-600 to-lime-500
    hover:from-lime-800 hover:via-lime-700 hover:to-lime-600
    focus:outline-none
    focus:ring-2 focus:ring-lime-300/80
    dark:focus:ring-lime-800
    shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80
    hover:shadow-lime-200
    rounded-xl px-5 py-0.5 text-center me-2 mb-2
    transition-all duration-300 ease-in-out
    transform hover:-translate-y-0 hover:scale-90
    transform-origin: center
    px-5
    py-0.5
    text-center
    me-2
    mb-2
  `;

  return (
    <button className={buttonClasses} {...props} />
  );
};

export default MiniButton;
