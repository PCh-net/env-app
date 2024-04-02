'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import 'tailwindcss/tailwind.css';
import MiniButton from '../components/MiniButton';
import SiteLogo from '../components/SiteLogo';
import Separator from '../components/Separator';

interface Item {
  id: string;
  item: string;
  thumbnail: string;
  user: string;
  sales: number;
  live_preview_url: string;
  siteName?: string;
}

const RandGrid = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [siteName, setSiteName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/envatoApiRand');

      if (!response.ok) {
        console.error('Failed to fetch popular items from local API');
        return;
      }

      const data = await response.json();

      setItems(data.data.popular.items_last_week.map((item: Item) => ({...item, siteName: data.siteName})));
      setSiteName(data.siteName);
    };

    fetchData();
  }, []);



  return (
      <div className="container mx-auto p-4">
        {items.length > 0 ? (
          <Separator title={`Popular products: ${siteName}`} subtitle="Watch more" />
        ) : (
          null
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.slice(0, 12).map((item, index) => (
          <Link key={index} href={`/${item.siteName}/${item.id}`}>
            <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
              <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={item.item} src={item.thumbnail} /></div>
              <h2 className="mt-2 text-sm md:text-lg lg:text-xl md:mt-0 bg-gradient-to-tr from-lime-700 via-lime-900 to-lime-900 bg-clip-text text-transparent line-clamp-2 text-ellipsis min-h-[2rem] ...">{item.item}</h2>
              <div className='flex justify-center items-center'>
              {item.siteName === 'graphicriver' ? (
                <div className="relative w-[300px] h-[300px] overflow-hidden rounded-lg justify-center">
                  <Image
                    src={item.live_preview_url}
                    alt={item.item}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }}
                    unoptimized={true}
                  />
                </div>
              ) : item.siteName === 'themeforest' ? (
                <img className="w-full object-cover py-2" alt={item.user} src={item.live_preview_url} />
              ) : item.siteName === 'codecanyon' ? (
                <img className="w-full object-cover py-2" alt={item.user} src={item.live_preview_url} />
              ) : (
                null
              )}
              </div>

              <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">{item.user} - sales: {item.sales}</p>
              <div className='flex justify-center'>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-start mt-2">
                  <SiteLogo site={`${item.siteName}.net`} />
                </div>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-end mt-2">
                <MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false}>More info</MiniButton>
                </div>
              </div>
            </div>
          </Link>
          ))
        ) : (
          <img className='w-20 h-20' src="/images/loading-gif-loading.gif" alt="loading-gif-loading" />
        )}
        </div>
      </div>
  );
};
export default RandGrid;
