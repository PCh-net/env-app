import React, { FC, ReactElement } from "react";
import Image from 'next/image'
import Link from "next/link";
import LinkText from "./LinkText";

export const Footer: FC = (): ReactElement => {
  return (
    <footer className="mt-12 mb-5 rounded-lg shadow-lg px-4 py-2 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
      <div className="flex flex-col md:flex-row lg:flex-row container mx-auto p-4">
        <div className="w-4/4 md:w-1/4 lg:w-1/4">
          <Image src="/images/logos/EnvatoMarket-Logo-Trans-Black.png" alt="EnvatoMarket-Logo-Trans-Black" width={689} height={82} />
        </div>
        <div className="w-4/4 md:w-3/4 lg:w-3/4 text-xs md:text-lg flex justify-end text-lime-800">
          <span className="text-xs md:text-xs lg:text-xs invisible md:visible lg:visible">Next.js | Type Script | Tailwind | 2024 by PCh</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
