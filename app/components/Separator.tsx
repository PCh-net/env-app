import React from 'react';
import { OpenInNew } from '@mui/icons-material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

interface SeparatorProps {
  title: string;
  subtitle: string;
}

const Separator: React.FC<SeparatorProps> = ({ title, subtitle }) => {
  return (
    <div className="mt-6 mb-5 w-full rounded-lg px-4 py-6 shadow-lg md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-300 via-lime-400 to-lime-600">
      <div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-bl from-lime-900 via-lime-800 to-lime-700 bg-clip-text text-transparent">{title}</h2>
        <p className='text-sm md:text-md lg:text-lg mt-1 ml-2 text-lime-800'>{subtitle}</p>
      </div>
    </div>
  );
};

export default Separator;
