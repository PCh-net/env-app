'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { metadata } from '../layout';
import Link from 'next/link'
import 'tailwindcss/tailwind.css';
import NavBar from '../components/NavBar';
import MiniButton from '../components/MiniButton';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import Separator from '../components/Separator';
import { categories as categoriesAJ } from '../data/categoriesAJ';
import AccordionItem from '../components/AccordionItem';

interface Items {
  id: string;
  category: string;
  item: string;
  rating: string;
  rating_decimal: number;  
  thumbnail: string;
  user: string;
  cost: number;
  live_preview_url: string;
  preview_url: string;
  sales: number;
  tags: string;
  url: string;
}

const PageAudioJungle = () => {
  const [items, setItems] = useState<Items[]>([]);
  const playingAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/envatoApiAJ', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch popular items from local API');
        return;
      }

      const data = await response.json();

      setItems(data.popular.items_last_three_months);
    };

    fetchData();
  }, []);

  const handlePlayAudio = useCallback((audioElement: HTMLAudioElement) => {
    if (playingAudioRef.current && playingAudioRef.current !== audioElement) {
      playingAudioRef.current.pause();
    }
    playingAudioRef.current = audioElement;
  }, []);


return (
    <main className="container mx-auto p-4">
      <NavBar/>
      <div className="flex items-center mt-6 mb-5 rounded-lg p-4 shadow-lg bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-400 via-lime-500 to-lime-700">
        <div className='w-3/4'>
          <h2 className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-bl from-lime-600 via-lime-700 to-lime-800 bg-clip-text text-transparent">Popular items</h2>
          <p className='text-md md:text-lg lg:text-lg mt-1 text-lime-300'>Last three months</p>
        </div>
        <div className='w-1/4 flex justify-center'>
          <Image src="/images/logos/EnvatoMarket-Audiojungle-Dark.png" alt="EnvatoMarket-Audiojungle-Dark" width={397} height={82} />
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
              <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={item.item} src={item.thumbnail} /></div>
              <h2 className="mt-2 text-sm md:text-md lg:text-xl md:mt-0 bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent line-clamp-3 text-ellipsis min-h-[3rem]">{item.item}</h2>
              {item.preview_url ? (
              <audio
                src={item.preview_url}
                controls
                controlsList="nodownload"
                preload="none"
                className="w-full h-8 md:h-8 lg:h-10 rounded-lg shadow-lg my-2"
                onPlay={(emit) => handlePlayAudio(emit.currentTarget)}
              >
                Your browser does not support the audio.
              </audio>
              )  : (null)}  
              <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-200">Price: {item.cost} $</p>
              <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">Sales: {item.sales}</p>
              {item.rating_decimal > 0 && (
                <ProgressBar currentProgress={item.rating_decimal} maxProgress={5} />
              )}
              <div className='flex justify-center'>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-start mt-2">
                  <Image src="/images/logos/EnvatoMarket-Audiojungle-Dark.png" alt="EnvatoMarket-Audiojungle-Dark" width={397} height={82} />
                </div>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-end mt-2">
                <Link key={index} href={`/audiojungle/${item.id}`}><MiniButton size={'text-xs md:text-xs lg:text-sm'} fullWidth={false}>More info</MiniButton></Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <img className='w-20 h-20' src="/images/loading-gif-loading.gif" alt="loading-gif-loading" />
        )}
        </div>
        <Separator title={`All category Audiojungle: `} subtitle="Watch more" />
        <div className="mt-12 mb-5 w-12/12 rounded-lg bg-gray-50 px-4 py-2 shadow-lg md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
          <AccordionItem categories={categoriesAJ} baseUrl="audiojungle" />
        </div>
      </div>
      <Footer/>
    </main>
  );
};
export default PageAudioJungle;
