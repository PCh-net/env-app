'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'

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
      <Link href='/themeforest'>
      <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
        <div className="-mt-16 flex justify-center md:justify-end">
          <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt='envato-logo-icon128x128' src='/images/logos/envato-logo-icon128x128.png' />
        </div>
        <Image src="/images/logos/EnvatoMarket-Themeforest-Dark.png" alt="EnvatoMarket-Themeforest-Dark" width={427} height={82} />
        <h2 className="mt-2 text-md md:text-md lg:text-md md:mt-0 bg-gradient-to-bl from-lime-700 via-lime-800 to-lime-800 bg-clip-text text-transparent">Professional WordPress Themes & Website Templates for any project</h2>
        <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">Discover of easy to customize themes, templates & CMS products, made by world-class developers</p>
      </div>
      </Link>
      <Link href='/codecanyon'>
      <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
        <div className="-mt-16 flex justify-center md:justify-end">
          <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt='envato-logo-icon128x128' src='/images/logos/envato-logo-icon128x128.png' />
        </div>
        <Image src="/images/logos/EnvatoMarket-Codecanyon-Dark.png" alt="EnvatoMarket-Codecanyon-Dark" width={393} height={82} />
        <h2 className="mt-2 text-md md:text-md lg:text-md md:mt-0 text-lime-900">Code, scripts & plugins for every website build</h2>
        <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">Choose from ecommerce plugins, mobile app templates, PHP, Bootstrap & more for any budget, built by the world’s best developers</p>
      </div>
      </Link>
      <Link href='/graphicriver'>
      <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
        <div className="-mt-16 flex justify-center md:justify-end">
          <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt='envato-logo-icon128x128' src='/images/logos/envato-logo-icon128x128.png' />
        </div>
        <Image src="/images/logos/EnvatoMarket-Graphicriver-Dark.png" alt="EnvatoMarket-Graphicriver-Dark" width={338} height={82} />
        <h2 className="mt-2 text-md md:text-md lg:text-md md:mt-0 bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent">Discover fonts, logos & presentations</h2>
        <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">Discover our huge collection of hand-reviewed graphic assets from our community of designers.</p>
      </div>
      </Link>
      <Link href='/photodune'>
      <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
        <div className="-mt-16 flex justify-center md:justify-end">
          <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt='envato-logo-icon128x128' src='/images/logos/envato-logo-icon128x128.png' />
        </div>
        <Image src="/images/logos/EnvatoMarket-Photodune-Dark.png" alt="EnvatoMarket-EnvatoMarket-Photodune-Dark-Dark" width={338} height={82} />
        <h2 className="mt-2 text-md md:text-md lg:text-md md:mt-0 bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent">Discover our collection of royalty free stock images from our community of photographers.</h2>
        <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">Top quality stock images for your next project</p>
      </div>
      </Link>
      <Link href='/videohive'>
      <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
        <div className="-mt-16 flex justify-center md:justify-end">
          <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt='envato-logo-icon128x128' src='/images/logos/envato-logo-icon128x128.png' />
        </div>
        <Image src="/images/logos/EnvatoMarket-Videohive-Dark.png" alt="EnvatoMarket-Videohive-Dark" width={338} height={82} />
        <h2 className="mt-2 text-md md:text-md lg:text-md md:mt-0 bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent">Stock Footage, Video Effects & Video Templates</h2>
        <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">Royalty videos and templates created by video professionals from all over the world.</p>
      </div>
      </Link>
      <Link href='/audiojungle'>
      <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
        <div className="-mt-16 flex justify-center md:justify-end">
          <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt='envato-logo-icon128x128' src='/images/logos/envato-logo-icon128x128.png' />
        </div>
        <Image src="/images/logos/EnvatoMarket-Audiojungle-Dark.png" alt="EnvatoMarket-Audiojungle-Dark" width={338} height={82} />
        <h2 className="mt-2 text-md md:text-md lg:text-md md:mt-0 bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent">Tracks and sounds from our community of musicians and sound engineers.</h2>
        <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">Royalty free music and audio tracks</p>
      </div>
      </Link>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">




</div>





<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {items.length > 0 ? (
        items.slice(0, 10).map((item, index) => (
          <Link key={index} href={`/themeforest/${item.id}`}>
            <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
              <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={item.item} src={item.thumbnail} /></div>
              <h3 className="mt-2 text-md md:text-md lg:text-lg md:mt-0 bg-gradient-to-tl from-lime-900 via-lime-700 to-lime-700 bg-clip-text text-transparent line-clamp-2 text-ellipsis min-h-[1rem]">{item.item}</h3>
              <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">{item.user}</p>
              <div className="flex bottom-4 right-4 w-1/3 justify-end mt-2">
                
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
