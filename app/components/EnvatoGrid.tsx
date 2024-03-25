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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.length > 0 ? (
        items.map((item, index) => (
          <Link key={index} href={`/themeforest/${item.id}`}>
          <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
            <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={item.item} src={item.thumbnail} /></div>
            <h2 className="mt-2 text-md md:text-md lg:text-lg md:mt-0 bg-gradient-to-tl from-lime-900 via-lime-700 to-lime-700 bg-clip-text text-transparent line-clamp-3 text-ellipsis min-h-[3rem]">{item.item}</h2>
            <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">{item.user}</p>
            <div className="flex bottom-4 right-4 w-1/3 justify-end mt-2">
              <Image src="/images/logos/EnvatoMarket-Themeforest-Dark.png" alt="Logo-EnvatoMarket-Themeforest-Dark" width={427} height={82} />
            </div>
          </div>
          </Link>
        ))
      ) : (
        <img className='w-20 h-20' src="/images/loading-gif-loading.gif" alt="loading-gif-loading" />
      )}

      <Link href='/wordpress'>
      <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
        <div className="-mt-16 flex justify-center md:justify-end">
          <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt='envato-logo-icon128x128' src='/images/logos/envato-logo-icon128x128.png' />
        </div>
        <h2 className="mt-2 text-xl md:text-2xl lg:text-xl md:mt-0 bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent line-clamp-3 text-ellipsis min-h-[3rem]">Templates Link</h2>
        <Image src="/images/logos/EnvatoMarket-Themeforest-Dark.png" alt="EnvatoMarket-Themeforest-Dark" width={427} height={82} />
        <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-800">Finf Your theme</p>
      </div>
      </Link>

      <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
        <div className="-mt-16 flex justify-center md:justify-end">
          <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt='envato-logo-icon128x128' src='/images/logos/envato-logo-icon128x128.png' />
        </div>
        <h2 className="mt-2 text-xl md:text-xl lg:text-xl md:mt-0 bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent line-clamp-3 text-ellipsis min-h-[3rem]">Templates</h2>
        <Image src="/images/logos/EnvatoMarket-Codecanyon-Dark.png" alt="EnvatoMarket-Codecanyon-Dark" width={393} height={82} />
        <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-800">Finf Your theme</p>
      </div>

      <div className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
        <div className="-mt-16 flex justify-center md:justify-end">
          <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt='envato-logo-icon128x128' src='/images/logos/envato-logo-icon128x128.png' />
        </div>
        <h2 className="mt-2 text-xl md:text-xl lg:text-xl md:mt-0 bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent line-clamp-3 text-ellipsis min-h-[3rem]">Templates</h2>
        <Image src="/images/logos/EnvatoMarket-Graphicriver-Dark.png" alt="EnvatoMarket-Graphicriver-Dark" width={338} height={82} />
        <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-800">Finf Your theme</p>
      </div>


    </div>
  );
};

export default EnvatoGrid;
