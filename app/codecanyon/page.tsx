'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { metadata } from '../layout';
import Link from 'next/link'
import 'tailwindcss/tailwind.css';
import NavBar from '../components/NavBar';
import MiniButton from '../components/MiniButton';
import MidButton from '../components/MidButton';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import Separator from '../components/Separator';
import { categories as categoriesCC } from '../data/categoriesCC';
import AccordionItem from '../components/AccordionItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';

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
  sales: number;
  tags: string;
  url: string;
}

const PageCodeCanyon = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [isMore, setMore] = useState<boolean>(false);

  const toggleDiv = () => {
    setMore(!isMore);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/envatoApiCC', {
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

return (
    <main className="container mx-auto p-4">
      <NavBar/>
      <div className="flex items-center mt-6 mb-5 rounded-lg p-4 shadow-lg bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-400 via-lime-500 to-lime-700">
        <div className='w-3/4'>
          <h2 className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-bl from-lime-600 via-lime-700 to-lime-800 bg-clip-text text-transparent">Popular items</h2>
          <p className='text-md md:text-lg lg:text-lg mt-1 text-lime-300'>Last three months</p>
        </div>
        <div className='w-1/4 flex justify-center'>
          <Image src="/images/logos/EnvatoMarket-Codecanyon-Dark.png" alt="EnvatoMarket-Codecanyon-Dark" width={393} height={82} />
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {items.length > 0 ? (
          items.slice(0, 12).map((item, index) => (
            <div key={index} className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
              <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={item.item} src={item.thumbnail} /></div>
              <h2 className="mt-2 text-sm md:text-md lg:text-xl md:mt-0 bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent line-clamp-2 text-ellipsis min-h-[2rem]">{item.item}</h2>
              <Link href={`/codecanyon/${item.id}`}>
                <img key={index} className="w-full object-cover py-2" alt={item.user} src={item.live_preview_url} />
              </Link>
              <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-200">Price: {item.cost} $</p>
              <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">Sales: {item.sales}</p>
              {item.rating_decimal > 0 && (
                <ProgressBar currentProgress={item.rating_decimal} maxProgress={5} />
              )}
              <div className='flex justify-center'>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-start mt-2">
                  <Image src="/images/logos/EnvatoMarket-Codecanyon-Dark.png" alt="EnvatoMarket-Codecanyon-Dark" width={393} height={82} />
                </div>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-end mt-2">
                <Link href={`/codecanyon/${item.id}`}>
                <MiniButton size={'text-xs md:text-xs lg:text-sm'} fullWidth={false}>More info</MiniButton>
                </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <img className='w-20 h-20' src="/images/loading-gif-loading.gif" alt="loading-gif-loading" />
        )}
        </div>

        {/* BUTTON */}
        {items && (
        <div className="flex flex-col md:flex-row lg:flex-row mt-6 mb-5 w-full rounded-lg px-4 py-6 shadow-lg md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-300 via-lime-400 to-lime-600">
          <div className="w-4/4 md:w-1/4 lg:w-1/4 align-middle">
          <img className="w-full" alt="EnvatoMarket-Codecanyon-Dark" src="/images/logos/EnvatoMarket-Codecanyon-Dark.png" />
          </div>
          <div className='w-4/4 md:w-2/4 lg:w-2/4'>
          </div>
          <div className="w-4/4 md:w-1/4 lg:w-1/4 flex flex-col items-end text-lime-800">
            <MidButton size={'text-sm md:text-sm lg:text-sm'} fullWidth={true} onClick={toggleDiv}>
              {isMore ? <KeyboardArrowUpIcon sx={{ color: green[100] }}/> : <KeyboardArrowDownIcon sx={{ color: green[100] }} />}
              {isMore ? '  Hide' : '  Show more'}           
            </MidButton>
          </div>
        </div>
        )}

        {/* SHOW MORE */}
        {isMore && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-full">
        {items.length > 0 ? (
          items.slice(12, 30).map((item, index) => (
            <div key={index} className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
              <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={item.item} src={item.thumbnail} /></div>
              <h2 className="mt-2 text-sm md:text-md lg:text-xl md:mt-0 bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent line-clamp-2 text-ellipsis min-h-[2rem]">{item.item}</h2>
              <Link href={`/codecanyon/${item.id}`}>
                <img className="w-full object-cover py-2" alt={item.user} src={item.live_preview_url} />
              </Link>
              <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-200">Price: {item.cost} $</p>
              <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">Sales: {item.sales}</p>
              {item.rating_decimal > 0 && (
                <ProgressBar currentProgress={item.rating_decimal} maxProgress={5} />
              )}
              <div className='flex justify-center'>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-start mt-2">
                  <Image src="/images/logos/EnvatoMarket-Codecanyon-Dark.png" alt="EnvatoMarket-Codecanyon-Dark" width={393} height={82} />
                </div>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-end mt-2">
                <Link href={`/codecanyon/${item.id}`}>
                <MiniButton size={'text-xs md:text-xs lg:text-sm'} fullWidth={false}>More info</MiniButton>
                </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <img className='w-20 h-20' src="/images/loading-gif-loading.gif" alt="loading-gif-loading" />
        )}
        </div>
        )}
        {/* END */}





        <Separator title={`All category Codecanyon: `} subtitle="Watch more" />
        <div className="mt-12 mb-5 w-12/12 rounded-lg bg-gray-50 px-4 py-2 shadow-lg md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
          <AccordionItem categories={categoriesCC} baseUrl="codecanyon" />
        </div>
      </div>
      <Footer/>
    </main>
  );
};
export default PageCodeCanyon;
