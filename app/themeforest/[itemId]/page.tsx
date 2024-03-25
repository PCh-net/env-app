'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'
import NavBar from '../../components/NavBar';
import 'tailwindcss/tailwind.css';
import Image from 'next/image'
import MiniButton from '../../components/MiniButton';
import MidButton from '../../components/MidButton';
import { NavigateNextOutlined } from '@mui/icons-material';

interface EnvatoItem {
  id: number;
  name: string;
  number_of_sales: number;
  author_username: string;
  author_url: string;
  url: string;
  updated_at: string;
  attributes: Attribute[];
  wordpress_theme_metadata?: WordpressThemeMetadata;
  description: string;
  site: string;
  classification: string;
  classification_url: string;
  price_cents: number;
  author_image: string;
  summary: string;
  rating: number;
  rating_count: number;
  published_at: string;
  trending: boolean;
  tags: string[];
  previews: Previews;
}

interface Attribute {
  name: string;
  value: string | string[];
  label: string;
}

interface WordpressThemeMetadata {
  theme_name: string;
  author_name: string;
  version: string;
  description: string;
}

interface Previews {
  live_site?: Preview;
  icon_with_landscape_preview?: Preview;
  landscape_preview?: Preview;
  icon_preview?: Preview;
}

interface Preview {
  href?: string;
  icon_url?: string;
  landscape_url?: string;
  type: string;
}


const ThemeForestDetail = () => {
  const [item, setItem] = useState<EnvatoItem | null>(null);
  const params = useParams();
  const itemId = params ? params.itemId as string : null;
  
  const convertCentsToDollars = (cents: number): string => {
    const dollars = cents / 100;
    return `$${dollars.toFixed(2)}`;
  }

  function convertToDateStr(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function delTagHTMLandLinki(desc: string): string {
    const descNoTag = desc.replace(/<\/?[^>]+(>|$)/g, "");
    const descNoTagLink = descNoTag.replace(/http[s]?:\/\/[^\s]+[\s]?/g, "");
    return descNoTagLink;
  }

  useEffect(() => {
    if (!itemId) return;

    fetch(`/api/envatoItemId?itemId=${itemId}`)
      .then(response => response.json())
      .then(data => setItem(data))
      .catch(error => console.error("Failed to fetch item details:", error));
  }, [itemId]);

  console.log(item);
  console.log(itemId);

  return (
    <main className="container mx-auto p-4">
      <NavBar />
      {item?.id ? (
        <div className="mt-12 mb-5 w-12/12 rounded-lg px-4 py-2 shadow-lg md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
          <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 border-8 border-white border-opacity-40 object-cover rounded-full" alt={item?.author_username} src={item.previews.icon_preview?.icon_url} /></div>
          <div className='flex flex-col md:flex-row lg:flex-row'>
            <div className='w-4/4 md:w-2/4 p-2'>
              <h2 className="mt-2 text-xl md:text-xl lg:text-2xl md:mt-0 text-lime-900 line-clamp-3 text-ellipsis min-h-[3rem]">{item?.name}</h2>
              <p className="text-xs md:text-md lg:text-lg mt-2 text-lime-900">
                {item.wordpress_theme_metadata?.description ? delTagHTMLandLinki(item.wordpress_theme_metadata.description) : ''}
              </p>
              <p className="text-xs md:text-md lg:text-md mt-2 text-lime-900">Author: {item?.author_username}</p>
              <p className="text-xs md:text-md lg:text-md mt-1 text-lime-900">ID: {item?.id}</p>
              <p className="text-xs md:text-md lg:text-md mt-1 text-lime-900">Sales: {item?.number_of_sales}</p>
              <p className="text-xs md:text-md lg:text-md mt-1 text-lime-900">Rating decimal: {item?.rating}</p>
              <p className="text-xs md:text-md lg:text-md mt-1 text-lime-900">Price: {convertCentsToDollars(item?.price_cents)}</p>
              <p className="text-xs md:text-md lg:text-md mt-1 text-lime-900">Updated at: {convertToDateStr(item.updated_at)}</p>
            </div>
            <div className='w-4/4 md:w-2/4 p-2'>
              <img className="w-full object-cover" alt={item?.author_username} src={item.previews.landscape_preview?.landscape_url} />
            </div>
          </div>

          <div className='flex flex-col md:flex-row lg:flex-row'>
            <div className="w-4/4 md:w-3/4 lg:w-3/4 p-2">
              <p className='text-xs md:text-sm lg:text-sm text-lime-900'>Tags:</p>
              <p className="text-xs md:text-xs lg:text-xs text-lime-900">
                {item.tags && item.tags.length > 0
                  ? item.tags.map((item_tag, index) => (
                      <span key={index}>
                          {item_tag}
                        {index < item.tags.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  : null
                }
              </p>
            </div>
            <div className="w-4/4 md:w-1/4 lg:w-1/4 p-2">
              <img className="w-full m-2" alt="Logo-EnvatoMarket-Themeforest-Dark" src="/images/logos/EnvatoMarket-Themeforest-Dark.png" />
            </div>
          </div>

          <div className='flex flex-col md:flex-row lg:flex-row mt-2'>
            <div className="w-4/4 md:w-2/4 lg:w-2/4">
              <Link href={item.url}><MidButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false} ><NavigateNextOutlined />Preview Envato Market</MidButton></Link>
            </div>
            <div className='w-4/4 md:w-2/4 lg:w-2/4'>

            </div>
          </div>
        </div>
      ) : (
        <img className='w-20 h-20' src="/images/loading-gif-loading.gif" alt="loading-gif-loading" />
      )}

      {item?.id ? (
        <div className="mt-12 mb-5 w-12/12 rounded-lg px-4 py-2 shadow-lg md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-400 via-lime-500 to-lime-700">
          <div>
            <h2 className="mt-2 text-xl md:text-xl lg:text-2xl md:mt-0 text-lime-900">Technical Specifications:</h2>
            <p className='text-xs md:text-md lg:text-lg mt-1 text-lime-900'>{item?.name}</p>
          </div>
          <div className='flex flex-col md:flex-row lg:flex-row mt-2'>
            <div className="w-6/6 md:w-2/6 lg:w-2/6">
            {
              item.attributes && item.attributes.length > 0 &&
                <div>
                  <h3 className='text-xs md:text-md lg:text-md mt-1 text-lime-950'>{item.attributes[1].label}:</h3>
                  {Array.isArray(item.attributes[1].value) ? (
                    item.attributes[1].value.map((value, index) => (
                      <p className='text-xs md:text-xs lg:text-xs text-lime-800' key={index}>{value}</p>
                    ))
                  ) : (
                    <p className='text-xs md:text-xs lg:text-xs text-lime-800'>{item.attributes[1].value}</p>
                  )}
                </div>
            }
            </div>
            <div className='w-6/6 md:w-2/6 lg:w-2/6'>
            {
              item.attributes && item.attributes[2] && (
                <div>
                  <p className='text-xs md:text-xs lg:text-xs text-lime-800'>
                    <p className='text-xs md:text-md lg:text-md mt-1 text-lime-950'>{item.attributes[2].label}:</p> 
                    {Array.isArray(item.attributes[2].value)
                      ? item.attributes[2].value.join(", ")
                      : item.attributes[2].value}
                  </p>
                </div>
              )
            }
            </div>
            <div className='w-6/6 md:w-2/6 lg:w-2/6'>
            {
              item.attributes[3] && item.attributes[3].label.length > 0 &&
                <div>
                  <h3 className='text-xs md:text-md lg:text-md mt-1 text-lime-950'>{item.attributes[3].label}:</h3>
                  {Array.isArray(item.attributes[3].value) ? (
                    item.attributes[3].value.map((value, index) => (
                      <p className='text-xs md:text-xs lg:text-xs text-lime-800' key={index}>{value}</p>
                    ))
                  ) : (
                    <p className='text-xs md:text-xs lg:text-xs text-lime-800'>{item.attributes[3].value}</p>
                  )}
                </div>
            }
            </div>
          </div>
          <div>
            <h2 className="mt-2 text-md md:text-md lg:text-md md:mt-0 text-lime-900">Author: {item.author_username}</h2>
            <p className='text-xs md:text-md lg:text-lg mt-1 text-lime-900'>{item.author_url}</p>
          </div>
        </div>
      ) : (
        null
      )}


    </main>
  );
};

export default ThemeForestDetail;
