'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import UniversalCard from './UniversalCard';
import MiniButton from './MiniButton';
import Separator from '../components/Separator';

interface Item {
  id: string;
  item: string;
  cost: string;
  thumbnail: string;
  user: string;
}

interface EnvatoApiResponse {
  "random-new-files": Item[];
}

const EnvatoGrid: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/envato');
        if (!response.ok) throw new Error('Network response was not ok');

        const data: EnvatoApiResponse = await response.json();

        setItems(data["random-new-files"]);
      } catch (error) {
        console.error("Could not fetch data:", error);
      }
    };

    fetchData();
  }, []);


  return (
<div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <UniversalCard
        link="/themeforest"
        imageSrc="/images/logos/envato-logo-icon128x128.png"
        altText="EnvatoMarket-Themeforest-Dark"
        title="Professional WordPress Themes & Website Templates for any project"
        description="Discover of easy to customize themes, templates & CMS products, made by world-class developers"
      />
      <UniversalCard
        link="/codecanyon"
        imageSrc="/images/logos/envato-logo-icon128x128.png"
        altText="EnvatoMarket-Codecanyon-Dark"
        title="Code, scripts & plugins for every website build"
        description="Choose from ecommerce plugins, mobile app templates, PHP, Bootstrap & more for any budget, built by the world’s best developers"
      />
      <UniversalCard
        link="/graphicriver"
        imageSrc="/images/logos/envato-logo-icon128x128.png"
        altText="EnvatoMarket-Graphicriver-Dark"
        title="Discover fonts, logos & presentations"
        description="Discover our huge collection of hand-reviewed graphic assets from our community of designers"
      />
      <UniversalCard
        link="/photodune"
        imageSrc="/images/logos/envato-logo-icon128x128.png"
        altText="EnvatoMarket-Photodune-Dark"
        title="Top quality stock images for your next project"
        description="Discover our collection of royalty stock images from our community of photographers"
      />
      <UniversalCard
        link="/videohive"
        imageSrc="/images/logos/envato-logo-icon128x128.png"
        altText="EnvatoMarket-Videohive-Dark"
        title="Stock Footage, Video Effects & Video Templates"
        description="Royalty videos and templates created by video professionals from all over the world"
      />
      <UniversalCard
        link="/audiojungle"
        imageSrc="/images/logos/envato-logo-icon128x128.png"
        altText="EnvatoMarket-Audiojungle-Dark"
        title="Royalty music and audio tracks"
        description="Tracks and sounds from our community of musicians and sound engineers"
      />
  </div>
  {items.length > 0 ? (
    <Separator title="Random new file" subtitle="Explore a collection of top-quality assets" />
  ) : (
    null
  )}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
    {items.length > 0 ? (
      items.slice(0, 10).map((item, index) => (
        <Link key={index} href={`/themeforest/${item.id}`}>
          <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
            <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={item.item} src={item.thumbnail} /></div>
            <h3 className="mt-4 text-md md:text-2xl lg:text-2xl md:mt-0 bg-gradient-to-tl from-lime-900 via-lime-700 to-lime-900 bg-clip-text text-transparent line-clamp-2 text-ellipsis min-h-[2rem] ...">{item.item}</h3>
            <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-200">Price: {item.cost} $</p>
            <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">{item.user}</p>
            <div className="flex bottom-4 right-4 w-3/3 md:w-3/3 lg:w-1/3 justify-end mt-2">
              <MiniButton size={'text-xs md:text-xs lg:text-sm'} fullWidth={true}>More info</MiniButton>
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

export default EnvatoGrid;
