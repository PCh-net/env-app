import React from 'react';

interface SeparatorProps {
  title: string;
  subtitle: string;
}

const Separator: React.FC<SeparatorProps> = ({ title, subtitle }) => {
  return (
    <div className="mt-6 mb-5 w-full rounded-lg px-4 py-6 shadow-lg md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-300 via-lime-400 to-lime-600">
      <div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-bl from-lime-900 via-lime-700 to-lime-500 bg-clip-text text-transparent">{title}</h2>
        <p className='text-sm md:text-md lg:text-lg mt-1 text-lime-900'>{subtitle}</p>
      </div>
    </div>
  );
};

export default Separator;