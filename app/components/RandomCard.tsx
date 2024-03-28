// components/UniversalCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface RandomCardProps {
  id: string;
  title: string;
  username: string;
  thumbnailUrl: string;
  href: string;
}

const RandomCard: React.FC<RandomCardProps> = ({ id, title, username, thumbnailUrl, href }) => {
  return (
    <Link key={id} href={href} passHref >
      <div className="group block mt-12 mb-5 transform rounded-lg bg-gray-50 shadow-lg duration-300 hover:scale-105">
        <div className="px-4 py-2 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700 rounded-lg">
          <div className="-mt-16 flex justify-center md:justify-end">
            <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={title} src={thumbnailUrl} />
          </div>
          <h3 className="mt-2 text-md md:text-lg lg:text-lg text-lime-900 line-clamp-2">{title}</h3>
          <p className="text-sm md:text-md mt-2 text-lime-800">{username}</p>
          <div className="flex justify-end mt-2">
            <span className="text-xs md:text-xs lg:text-xs text-lime-700 group-hover:text-lime-900 transition duration-300">More info</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RandomCard;
