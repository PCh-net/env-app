// import Image from 'next/image'
// import Link from 'next/link';
// import React from 'react';
// import MiniButton from './MiniButton';

// interface UniversalCardProps {
//   link: string;
//   imageSrc: string;
//   altText: string;
//   title: string;
//   description: string;
// }

// const UniversalCard: React.FC<UniversalCardProps> = ({
//   link,
//   imageSrc,
//   altText,
//   title,
//   description,
// }) => {
//   return (
//     <Link href={link} className="mt-12 mb-5 w-full transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
//       <div className="-mt-16 flex justify-center md:justify-end">
//         <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={altText} src={imageSrc} />
//       </div>
//       <div className="p-2 flex justify-center">
//         <Image src={`/images/logos/${altText}.png`} alt={altText} width={393} height={82} unoptimized={true} />
//       </div>
//       <h2 className="mt-2 text-md md:text-lg lg:text-lg md:mt-0 text-lime-900">{title}</h2>
//       <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">{description}</p>
//       <MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false} >AudioJungle</MiniButton>
//     </Link>
//   );
// };

// export default UniversalCard;
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MiniButton from './MiniButton';

interface UniversalCardProps {
  link: string;
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
}

const UniversalCard: React.FC<UniversalCardProps> = ({
  link,
  imageSrc,
  altText,
  title,
  description,
}) => {
  return (
    <Link href={link} passHref className="mt-12 mb-5 w-full transform rounded-lg bg-gray-50 px-4 py-2 shadow-lg duration-300 hover:scale-105 md:px-8 md:py-4 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime-200 via-lime-500 to-lime-700">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="-mt-16 flex justify-center md:justify-end">
            <img className="h-20 w-20 rounded-full border-8 border-white border-opacity-40 object-cover" alt={altText} src={imageSrc} />
          </div>
          <div className="p-2 flex justify-center">
            <Image src={`/images/logos/${altText}.png`} alt={altText} width={393} height={82} unoptimized={true} priority />
          </div>
          <h2 className="mt-2 text-md md:text-lg lg:text-lg md:mt-0 text-lime-900">{title}</h2>
          <p className="text-sm md:text-md lg:text-md mt-2 text-lime-800">{description}</p>
        </div>
        <div className="self-start mt-4">
          <MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false}>More info</MiniButton>
        </div>
      </div>
    </Link>
  );
};

export default UniversalCard;
