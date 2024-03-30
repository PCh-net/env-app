import React from 'react';
import EnvatoGrid from './components/EnvatoGrid';
import 'tailwindcss/tailwind.css';
import NavBar from './components/NavBar';
import LinkTextLight from './components/LinkTextLight'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <NavBar/>
      <div className="container mx-auto p-4">
        <div className="mt-6 mb-5 w-12/12 rounded-lg px-4 py-2 shadow-lg md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-400 via-lime-500 to-lime-700">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-bl from-lime-600 via-lime-700 to-lime-800 bg-clip-text text-transparent">Find Your style in Envato Market</h2>
            <p className='text-xs md:text-md lg:text-lg mt-1 text-lime-900'>Explore a collection of top-quality assets</p>
          </div>
          <div className='flex flex-col md:flex-row lg:flex-row mt-2'>
            <div className="w-6/6 md:w-2/6 lg:w-2/6 py-4">
            <Image src="/images/logos/EnvatoMarket-Logo-Trans-Black.png" alt="EnvatoMarket-Logo-Trans-Black" width={689} height={82} />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <EnvatoGrid />
      </div>
    </main>
  );
}
