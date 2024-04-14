import React, { FC, ReactElement } from "react";
import Image from 'next/image'
import Link from "next/link";
import LinkText from "./LinkText";
import MiniButton from '../components/MiniButton';

export const Footer: FC = (): ReactElement => {
  return (
    <footer className="mt-12 mb-5 rounded-lg shadow-lg px-4 py-2 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-lime-400 via-lime-600 to-lime-700">
      <div className="flex flex-col md:flex-row lg:flex-row container mx-auto p-4">
        <div className="w-4/4 md:w-1/4 lg:w-1/4">
          <Image src="/images/logos/envato_market_api.png" alt="envato_market_api" width={352} height={40} />
        </div>
        <div className="w-4/4 md:w-3/4 lg:w-3/4 text-xs md:text-lg flex flex-col items-end text-lime-800">
          <p className="text-lime-200 text-xs md:text-xs lg:text-xs invisible md:visible lg:visible">Next.js 14 | Type Script | Tailwind | 2024 by PCh</p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
