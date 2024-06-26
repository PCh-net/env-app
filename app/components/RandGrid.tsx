'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import 'tailwindcss/tailwind.css';
import MiniButton from '../components/MiniButton';
import SiteLogo from '../components/SiteLogo';
import Separator from './Separator';
import MidButton from './MidButton';
import { green } from '@mui/material/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ProgressBar from '../components/ProgressBar';


interface Item {
  id: string;
  item: string;
  thumbnail: string;
  user: string;
  sales: number;
  live_preview_url: string;
  siteName?: string;
  live_preview_video_url?: string;
  rating_decimal: number;
  cost: number;
}

const RandGrid = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [siteName, setSiteName] = useState<string>('');
  const [isMore, setMore] = useState<boolean>(false);

  const toggleDiv = () => {
    setMore(!isMore);
  };


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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full max-h-full">
        {items.length > 0 ? (
          items.slice(0, 12).map((item, index) => (
            <div key={index} className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
              <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={item.item} src={item.thumbnail} /></div>
              <h2 className="mt-2 text-sm md:text-lg lg:text-xl md:mt-0 bg-gradient-to-tr from-lime-700 via-lime-900 to-lime-900 bg-clip-text text-transparent line-clamp-2 text-ellipsis min-h-[2rem]">{item.item}</h2>
              <div className='flex justify-center items-center'>
              {item.siteName === 'graphicriver' ? (
                <div className="w-[400px] h-[300px] overflow-hidden relative rounded-lg">
                <Link href={`/graphicriver/${item.id}`}>
                  <img src={item.live_preview_url} alt={item.item} className="w-full h-full object-cover object-top"/>
                  </Link>
                </div>
              ) : item.siteName === 'themeforest' ? (
                <Link href={`/${item.siteName}/${item.id}`}><img className="w-full object-cover transform hover:scale-90 transition-transform duration-200 hover:shadow-xl hover:shadow-lime-200/70" alt={item.user} src={item.live_preview_url} /></Link>
              ) : item.siteName === 'codecanyon' ? (
                <Link href={`/${item.siteName}/${item.id}`}><img className="w-full object-cover transform hover:scale-90 transition-transform duration-200 hover:shadow-xl hover:shadow-lime-200/70" alt={item.user} src={item.live_preview_url} /></Link>
              ) : item.siteName === 'videohive' ? (
                <video width="590" height="332" controls loop playsInline preload="none" poster={item.live_preview_url}>
                <source src={item.live_preview_video_url} type="video/mp4" />
                <track
                  src={item.live_preview_video_url}
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                null
              )}
              </div>
              <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-800">Price: {item.cost} $</p>
              <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-800">Sales last week: {item.sales}</p>
              {
                item.rating_decimal > 0 ? (
                  <ProgressBar currentProgress={item.rating_decimal} maxProgress={5} />
                ) : (
                  <div className="h-4 md:h-4 lg:h-6 w-full relative my-2">
                    
                  </div>
                )
              }
              <div className='flex justify-center items-center'>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-start mt-2">
                  <SiteLogo site={`${item.siteName}.net`} />
                </div>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-end mt-2">
                <Link href={`/${item.siteName}/${item.id}`}>
                  <MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false}>More info</MiniButton>
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
            <SiteLogo site={`${siteName}.net`} />
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
            <div key={index} className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
              <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={item.item} src={item.thumbnail} /></div>
              <h2 className="mt-2 text-sm md:text-lg lg:text-xl md:mt-0 bg-gradient-to-tr from-lime-700 via-lime-900 to-lime-900 bg-clip-text text-transparent line-clamp-2 text-ellipsis min-h-[2rem] ...">{item.item}</h2>
              <div className='flex justify-center items-center'>
              {item.siteName === 'graphicriver' ? (
                <div className="w-[400px] h-[300px] overflow-hidden relative rounded-lg">
                <Link href={`/graphicriver/${item.id}`}>
                  <img src={item.live_preview_url} alt={item.item} className="w-full h-full object-cover object-top"/>
                  </Link>
                </div>
              ) : item.siteName === 'themeforest' ? (
                <Link href={`/${item.siteName}/${item.id}`}><img className="w-full object-cover transform hover:scale-90 transition-transform duration-200 hover:shadow-xl hover:shadow-lime-200/70" alt={item.user} src={item.live_preview_url} /></Link>
              ) : item.siteName === 'codecanyon' ? (
                <Link href={`/${item.siteName}/${item.id}`}><img className="w-full object-cover transform hover:scale-90 transition-transform duration-200 hover:shadow-xl hover:shadow-lime-200/70" alt={item.user} src={item.live_preview_url} /></Link>
              ) : item.siteName === 'videohive' ? (
                <video width="590" height="332" controls loop playsInline preload="none" poster={item.live_preview_url}>
                <source src={item.live_preview_video_url} type="video/mp4" />
                <track
                  src={item.live_preview_video_url}
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                null
              )}
              </div>
              <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-800">Price: {item.cost} $</p>
              <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-800">Sales last week: {item.sales}</p>
              {
                item.rating_decimal > 0 ? (
                  <ProgressBar currentProgress={item.rating_decimal} maxProgress={5} />
                ) : (
                  <div className="h-4 md:h-4 lg:h-6 w-full relative my-2">
                    
                  </div>
                )
              }
              <div className='flex justify-center items-center'>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-start mt-2">
                  <SiteLogo site={`${item.siteName}.net`} />
                </div>
                <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-end mt-2">
                <Link href={`/${item.siteName}/${item.id}`}>
                  <MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false}>More info</MiniButton>
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
        {/* BUTTONS START */}

        {/* BUTTONS END */}       

      </div>
  );
};
export default RandGrid;
