import React from 'react';
import Link from 'next/link';
import MiniButton from '@/app/components/MiniButton';
import { categories } from '../data/categoriesCC';

interface SeparatorButtonProps {
  title: string;
  subtitle: string;
  path: string;
}

function replaceSlashes(inputString: string): string {
  return inputString
      .replace(/\//g, ', ')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
}

const SeparatorButton: React.FC<SeparatorButtonProps> = ({ title, subtitle, path }) => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row mt-6 mb-5 w-full rounded-lg px-4 py-6 shadow-lg md:px-4 md:py-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-300 via-lime-400 to-lime-600">
      <div className=''>
        <h2 className="text-xl md:text-2xl lg:text-2xl bg-gradient-to-bl from-lime-900 via-lime-800 to-lime-700 bg-clip-text text-transparent">{replaceSlashes(title)}</h2>
        <p className='text-sm md:text-md lg:text-lg my-2 ml-2 text-lime-800'>{subtitle}</p>
        <Link href={path}>
          <MiniButton size={'text-sm md:text-sm lg:text-xl'} fullWidth={false}>All categories</MiniButton>
        </Link>
      </div>
    </div>
  );
};

export default SeparatorButton;
