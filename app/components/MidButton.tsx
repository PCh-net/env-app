import React from 'react';

const MidButton = ({ size = 'text-xl', fullWidth = false, ...props }) => {
  const buttonClasses = `
    ${size}
    ${fullWidth ? 'w-full' : ''}
    text-lime-100
    bg-gradient-to-br from-lime-700 via-lime-600 to-lime-500
    hover:from-lime-800 hover:via-lime-700 hover:to-lime-600
    transform hover:scale-90 transition-transform duration-200
    focus:ring-2 focus:ring-lime-300/80
    dark:focus:ring-lime-800
    rounded-xl
    shadow-lg
    shadow-lime-400/80
    rounde d-lg
    px-3.5
    py-1.5
    text-center
    me-2
    mb-2
  `;

  return (
    <button className={buttonClasses} {...props} />
  );
};

export default MidButton;
