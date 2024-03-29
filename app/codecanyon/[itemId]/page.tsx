'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image'
import NavBar from '../../components/NavBar';
import LinkText from '../../components/LinkText'
import LinkTextLight from '../../components/LinkTextLight'
import 'tailwindcss/tailwind.css';
import MidButton from '../../components/MidButton';
import SiteLogo from '../../components/SiteLogo';
import { OpenInNew } from '@mui/icons-material';


interface ApiResponse {
  productDetails: EnvatoItem;
  similarProducts: {
    matches: EnvatoItem[];
  };
}

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
  icon_with_thumbnail_preview: any;
  icon_with_square_preview?: Preview;
  icon_with_video_preview: Preview;
  live_site?: Preview;
  icon_with_landscape_preview?: Preview;
  landscape_preview?: Preview;
  icon_preview?: Preview;
  thumbnail_preview?: Preview;
}

interface Preview {
  href?: string;
  icon_url?: string;
  landscape_url?: string;
  type: string;
  video_url?: string;
  square_url?: string;
  small_url?: string;
  large_url?: string;
}


const CodecanyonDetail = () => {
  const [item, setItem] = useState<EnvatoItem | null>(null);
  const [similarProducts, setSimilarProducts] = useState<EnvatoItem[]>([]); // add
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

  function getSiteKey(site: string): 'themeforest' | 'videohive' | 'photodune' | 'codecanyon' | 'graphicriver' | null {
    if (site.includes("themeforest.net")) {
      return 'themeforest';
    } else if (site.includes("videohive.net")) {
      return 'videohive';
    } else if (site.includes("photodune.net")) {
      return 'photodune';
    } else if (site.includes("codecanyon.net")) {
      return 'codecanyon';
    } else if (site.includes("graphicriver.net")) {
      return 'graphicriver';
    } else {
      return null;
    }
  }

// ADD
useEffect(() => {
  if (!itemId) return;

  fetch(`/api/envatoItemId?itemId=${itemId}`)
    .then(response => response.json())
    .then((data: ApiResponse) => {
      setItem(data.productDetails);
      setSimilarProducts(data.similarProducts.matches);
    })
    .catch(error => console.error("Failed to fetch item details:", error));
}, [itemId]);

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
              {item.previews.landscape_preview?.landscape_url ? (
                <img className="w-full object-cover" alt={item?.author_username} src={item.previews.landscape_preview?.landscape_url} />
              ) : (null)}

              {item.previews.icon_with_video_preview?.video_url ? (
                <video width="590" height="332" controls autoPlay loop muted playsInline preload="none">
                <source src={item.previews.icon_with_video_preview?.video_url} type="video/mp4" />
                <track
                  src={item.previews.icon_with_video_preview?.video_url}
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                    />
                  Your browser does not support the video tag.
                </video>
              )  : (null)}

              {item.previews.icon_with_square_preview?.square_url ? (
                <img className="w-full object-cover" alt={item?.author_username} src={item.previews.icon_with_square_preview?.square_url} />
              )  : (null)}

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
              <SiteLogo site={item.site} />
            </div>
          </div>

          <div className='flex flex-col md:flex-row lg:flex-row mt-2'>
            <div className="w-4/4 md:w-2/4 lg:w-2/4 p-4">
              <img className="w-full object-cover" alt='EnvatoMarket-Logo-Trans-Black' src="/images/logos/EnvatoMarket-Logo-Trans-Black.png" />
            </div>
            <div className='w-4/4 md:w-2/4 lg:w-2/4 p-4 flex justify-end align-bottom'>
              <LinkTextLight to={item.url} fontSize='text-xs md:text-xs lg:text-xs'>Preview Envato Market <OpenInNew className='text-xs md:text-xs lg:text-xs' /></LinkTextLight>
            </div>
          </div>
        </div>
      ) : (
        <img className='w-20 h-20' src="/images/loading-gif-loading.gif" alt="loading-gif-loading" />
      )}

      {item?.id ? (
        <div className="mt-6 mb-5 w-12/12 rounded-lg px-4 py-2 shadow-lg md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-400 via-lime-500 to-lime-700">
          <div>
            <h2 className="mt-2 text-xl md:text-xl lg:text-2xl md:mt-0 text-lime-900">Technical Specifications:</h2>
            <p className='text-xs md:text-md lg:text-lg mt-1 text-lime-900'>{item?.name}</p>
          </div>
          <div className='flex flex-col md:flex-row lg:flex-row mt-2'>
            <div className="w-6/6 md:w-2/6 lg:w-2/6">
            {
              item.attributes && item.attributes.length > 0 &&
                <div>
                  <h3 className='text-xs md:text-md lg:text-md mt-1 text-lime-950'>{item.attributes[0].label}:</h3>
                  {Array.isArray(item.attributes[0].value) ? (
                    item.attributes[0].value.map((value, index) => (
                      <p className='text-xs md:text-xs lg:text-xs text-lime-800' key={index}>{value}</p>
                    ))
                  ) : (
                    <p className='text-xs md:text-xs lg:text-xs text-lime-800'>{item.attributes[0].value}</p>
                  )}
                </div>
            }
            </div>
            <div className='w-6/6 md:w-2/6 lg:w-2/6'>
            {
              item.attributes && item.attributes[1] && (
                <div>
                  <div className='text-xs md:text-xs lg:text-xs text-lime-800'>
                    <p className='text-xs md:text-md lg:text-md mt-1 text-lime-950'>{item.attributes[1].label}:</p> 
                    {Array.isArray(item.attributes[1].value)
                      ? item.attributes[1].value.join(", ")
                      : item.attributes[1].value}
                  </div>
                </div>
              )
            }
            </div>
            <div className='w-6/6 md:w-2/6 lg:w-2/6'>
            {
              item.attributes[6] && item.attributes[6].label.length > 0 &&
                <div>
                  <h3 className='text-xs md:text-md lg:text-md mt-1 text-lime-950'>{item.attributes[6].label}:</h3>
                  {Array.isArray(item.attributes[6].value) ? (
                    item.attributes[6].value.map((value, index) => (
                      <p className='text-xs md:text-xs lg:text-xs text-lime-800' key={index}>{value}</p>
                    ))
                  ) : (
                    <p className='text-xs md:text-xs lg:text-xs text-lime-800'>{item.attributes[6].value}</p>
                  )}
                </div>
            }
            </div>
          </div>
          
          <div>
            <h2 className="mt-2 text-md md:text-md lg:text-md md:mt-0 text-lime-900">Author:</h2>
            <LinkTextLight to={item.author_url} fontSize='text-xs md:text-xs lg:text-xs'>{item.author_username}</LinkTextLight>
          </div>
        </div>
      ) : (
        null
      )}

      {similarProducts.length > 0 ? (<h3 className='text-3xl md:text-3xl lg:text-4xl bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent'>Similar items:</h3>) : (null)}

      {/* similarProducts START */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {similarProducts.length > 0 ? (
        similarProducts.map((similarProduct, index) => (
          <Link key={index} href={`/${getSiteKey(similarProduct.site)}/${similarProduct.id}`}>
          <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
          {similarProduct.previews.landscape_preview?.landscape_url  && !similarProduct.previews.icon_with_video_preview?.video_url && <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={similarProduct.name} src={similarProduct.previews.icon_with_landscape_preview?.icon_url} /></div>}
          {similarProduct.previews.icon_preview?.icon_url &&<div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={similarProduct.name} src={similarProduct.previews.icon_preview?.icon_url} /></div>}
          {similarProduct.previews.icon_with_video_preview?.icon_url &&<div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={similarProduct.name} src={similarProduct.previews.icon_with_video_preview?.icon_url} /></div>}
          {similarProduct.previews.icon_with_thumbnail_preview?.icon_url &&<div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={similarProduct.name} src={similarProduct.previews.icon_with_thumbnail_preview?.icon_url} /></div>}
            <h2 className="text-lime-300 text-md md:text-md lg:text-lg md:mt-0 line-clamp-2 text-ellipsis min-h-[2rem]">{similarProduct.name}</h2>
            <p className="text-xs md:text-md lg:text-md mt-1 text-lime-900 line-clamp-4 text-ellipsis min-h-[4rem] ...">{similarProduct.summary}</p>
            {/* <>
              {similarProduct.previews.landscape_preview?.landscape_url && <p>Value 1 OK</p>}
              {similarProduct.previews.icon_with_video_preview?.icon_url && <p>Value 2 OK</p>}
              {similarProduct.previews.icon_with_square_preview?.square_url && <p>Value 3 OK</p>}
              {similarProduct.previews.thumbnail_preview?.large_url && <p>Value 4 OK</p>}
              {similarProduct.previews.icon_with_thumbnail_preview?.icon_url && <p>Value 5 OK ??</p>}
            </> */}

            {/* --- */}
              {similarProduct.previews.landscape_preview?.landscape_url && !similarProduct.previews.icon_with_video_preview?.video_url  ? (
                <img className="w-full object-cover py-2" alt={item?.author_username} src={similarProduct.previews.landscape_preview?.landscape_url} />
              ) : (null)}

              {similarProduct.previews.icon_with_video_preview?.video_url ? (
                <video width="590" height="332" controls autoPlay loop muted playsInline preload="none">
                <source src={similarProduct.previews.icon_with_video_preview?.video_url} type="video/mp4" />
                <track
                  src={similarProduct.previews.icon_with_video_preview?.video_url}
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                    />
                  Your browser does not support the video tag.
                </video>
              )  : (null)}

              {similarProduct.previews.icon_with_square_preview?.square_url ? (
                <img className="w-full object-cover py-2" alt={item?.author_username} src={similarProduct.previews.icon_with_square_preview?.square_url} />
              )  : (null)}

              {similarProduct.previews.thumbnail_preview?.small_url ? (
                <img className="w-full object-cover py-2" alt={item?.author_username} src={similarProduct.previews.thumbnail_preview?.large_url} />
              )  : (null)}

              {/* <p>ORG:{similarProduct.previews.landscape_preview?.landscape_url}</p>
              <p>SQUERE:{similarProduct.previews.icon_with_square_preview?.square_url}</p>
              <p>SMALL URL:{similarProduct.previews.thumbnail_preview?.small_url}</p>
              <p>Video:{similarProduct.previews.icon_with_video_preview?.video_url}</p> */}

            {/* --- */}
            <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">Author: {item?.author_username}</p>
            <div className="w-1/3 mt-2">
              <SiteLogo site={similarProduct.site} />
            </div>
          </div>
          </Link>
        ))
        ) : (
          null
        )}
      </div>
      {/* similarProducts END */}

    </main>
  );
};

export default CodecanyonDetail;
