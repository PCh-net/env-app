'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NavBar from '@/app/components/NavBar';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import Link from 'next/link';
import MiniButton from '@/app/components/MiniButton';
import MidButton from '@/app/components/MidButton';
import ProgressBar from '@/app/components/ProgressBar';
import Footer from '@/app/components/Footer';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

interface ProductDetails {
  id: string;
  author_image: string;
  author_username: string;
  name: string;
  previews: Previews;
  price_cents: number;
  number_of_sales: number;
  rating: Ratings;
  description: string;
  classification: string;
  tags: string[];
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

interface Ratings {
  count: number;
  rating: number;
}


const CategoryPage: React.FC = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);  // Możesz dostosować domyślną wielkość strony
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params = useParams();
  
  const categoryName = params?.categoryName;
  const categoryPath = Array.isArray(categoryName) ? categoryName.join('/') : categoryName;

  const convertCentsToDollars = (cents: number): string => {
    const dollars = cents / 100;
    return `$${dollars.toFixed(2)}`;
  }


  function replaceSlashes(inputString: string): string {
    return inputString
        .replace(/\//g, ', ')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

async function fetchData() {
  if (!categoryPath) return;
  setIsLoading(true);
  try {
    const url = `/api/envatoApiSearch?categoryName=${categoryPath}&page=${currentPage}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API responded with status code ${res.status}`);
    }
    const data = await res.json();
    setProducts(data.productDetails.matches);
  } catch (err: any) {
    setError(err.message || 'An unknown error occurred');
  } finally {
    setIsLoading(false);
  }
}

  useEffect(() => {
    fetchData();
  }, [categoryPath, currentPage, pageSize]);



  if (error) {
    return <div>Error: {error}</div>;
  }

// console.log("path:"+categoryPath);
// console.log("name:"+categoryName);
// console.log(products);



  return (
    <main className="container mx-auto p-4">
      <NavBar />
      <div className="flex items-center mt-6 mb-5 rounded-lg p-4 shadow-lg bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-400 via-lime-500 to-lime-700">
        <div className='w-3/4'>
          <h2 className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-bl from-lime-600 via-lime-700 to-lime-800 bg-clip-text text-transparent">Category:</h2>
          <p className='text-md md:text-lg lg:text-lg mt-1 text-lime-300'>{categoryPath ? replaceSlashes(categoryPath) : ''}</p>
          <p className='text-md md:text-lg lg:text-lg mt-1 text-lime-300'>Page: {currentPage}</p>
        </div>
        <div className='w-1/4 flex justify-center'>
          <Image src="/images/logos/EnvatoMarket-Themeforest-Dark.png" alt="EnvatoMarket-Themeforest-Dark" width={403} height={82} />
        </div>
      </div>

      {isLoading ? (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress 
            sx={{
              backgroundColor: '#d9f99d', // Zmiana koloru tła paska
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#65a30d', // Zmiana koloru wypełnienia paska
              }
            }}
          />
        </Stack>
      ) : (
        null
      )}

      <div className="container mx-auto p-4">
        {products.length > 0 ? (
          <div className='flex justify-center py-4'>
            <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-start mt-2">
            <MidButton size={'text-xs md:text-xs lg:text-xl'} fullWidth={true} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}><KeyboardArrowLeftIcon className='text-xs md:text-xs lg:text-xl mr-2' />Previous page</MidButton>
            </div>
            <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-end mt-2">
              <MidButton size={'text-xs md:text-xs lg:text-xl'} fullWidth={true} onClick={() => setCurrentPage(prev => prev + 1)}>Next page<KeyboardArrowRightIcon className='text-xs md:text-xs lg:text-xl ml-2' /></MidButton>
            </div>
          </div>
        ) : (
          null
        )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="mt-12 mb-5 w-12/12 transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
                <div className="-mt-16 flex justify-center md:justify-end"><img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={product.author_username} src={product.author_image} /></div>
                <h2 className="mt-2 text-sm md:text-xl lg:text-2xl md:mt-0 bg-gradient-to-tl from-lime-600 via-lime-700 to-lime-900 bg-clip-text text-transparent line-clamp-2 text-ellipsis min-h-[3rem]">{product.name}</h2>
                <Link href={`/themeforest/${product.id}`}>
                <img className="w-full object-cover transform hover:scale-90 transition-transform duration-200 hover:shadow-xl hover:shadow-lime-200/70" alt={product.author_username} src={product.previews.landscape_preview?.landscape_url} />
                </Link>
                <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800 line-clamp-3 text-ellipsis min-h-[3rem]">{product.description}</p>
                <p className="text-sm md:text-lg lg:text-lg mt-2 text-lime-200">Price: {convertCentsToDollars(product.price_cents)}</p>
                <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">Sales: {product.number_of_sales}</p>
                {
                  product.rating.rating > 0 ? (
                    <ProgressBar currentProgress={product.rating.rating} maxProgress={5} />
                  ) : (
                    <div className="h-4 md:h-4 lg:h-6 w-full relative my-2">
                      
                    </div>
                  )
                }
                <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">{replaceSlashes(product.classification)}</p>
                <p className="text-xs md:text-mxsd lg:text-xs mt-2 text-lime-800 line-clamp-2 text-ellipsis min-h-[3rem]">Tags: {product.tags.join(', ')}</p>
                <div className='flex justify-center'>
                  <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-start mt-2">
                    <Image src="/images/logos/EnvatoMarket-Themeforest-Dark.png" alt="Logo-EnvatoMarket-Themeforest-Dark" width={403} height={82} />
                  </div>
                  <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-end mt-2">
                  <Link href={`/themeforest/${product.id}`}>
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
          {products.length > 0 ? (
          <div className='flex justify-center py-4'>
            <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-start mt-2">
            <MidButton
              size={'text-xs md:text-xs lg:text-xl'}
              fullWidth={true}
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <KeyboardArrowLeftIcon className='text-xs md:text-xs lg:text-xl mr-2' />Previous page
            </MidButton>
            </div>
            <div className="flex bottom-4 right-4 w-2/4 md:w-2/4 lg:w-2/4 justify-end mt-2">
            <MidButton
              size={'text-xs md:text-xs lg:text-xl'}
              fullWidth={true}
              onClick={() => {
                setCurrentPage(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next page<KeyboardArrowRightIcon className='text-xs md:text-xs lg:text-xl ml-2' />
            </MidButton>
            </div>
          </div>
          ) : (
            null
          )}
        </div>
      <Footer/>
    </main>
  );
};

export default CategoryPage;
