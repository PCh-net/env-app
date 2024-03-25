import React from 'react';
import EnvatoGrid from './components/EnvatoGrid';
import Footer from './components/Footer';
import 'tailwindcss/tailwind.css';
import NavBar from './components/NavBar';



export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <NavBar/>
      <div className="container mx-auto p-4">
        <p className='text-2xl md:text-3xl lg:text-4xl bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent'>Random new files</p>
      </div>
      <div className="container mx-auto p-4">
        <EnvatoGrid />
      </div>
    </main>
  );
}
