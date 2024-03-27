'use client'
import React, { useState } from 'react';
import Link from 'next/link'
import { MenuOutlined, NavigateNextOutlined, NavigateBeforeOutlined, MenuOpenOutlined } from '@mui/icons-material';
import MiniButton from './MiniButton';
import Image from 'next/image'


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav>
      <div className="mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <Link href="/" className="flex items-center py-2 px-2">
                <Image src="/images/android-icon-192x192.png" className='w-12 h-12' alt="android-icon-192x192" width={192} height={192} priority />
              </Link>
            </div>
            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" ><MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false} >Home</MiniButton></Link>
              <Link href="/themeforest" ><MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false} >Themeforest</MiniButton></Link>
              <Link href="/codecanyon" ><MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false} >Codecanyon</MiniButton></Link>
              <Link href="/graphicriver" className='pl-2' ><MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false} >Graphicriver</MiniButton></Link>
              <Link href="/photodune" className='pl-2' ><MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false} >Photodune</MiniButton></Link>
              <Link href="/videohive" className='pl-2' ><MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false} >Videohive</MiniButton></Link>
              <Link href="/audiojungle" className='pl-2' ><MiniButton size={'text-xs md:text-xs lg:text-xs'} fullWidth={false} >AudioJungle</MiniButton></Link>
            </div>
          </div>
          {/* mobile menu button */}
          <div className="md:hidden flex items-center mr-4">
            <button onClick={toggleMenu} className="mobile-menu-button bg-lime-400 rounded-xl p-4">
            {isOpen ? <MenuOpenOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className={isOpen ? 'mobile-menu md:hidden' : 'hidden'}>
        <div className='text-xl text-lime-100 hover:text-lime-300'>
          <Link href="/" ><MiniButton fullWidth={true} ><NavigateNextOutlined />Home page<NavigateBeforeOutlined /></MiniButton></Link>
          <Link className='mt-4' href="/themeforest" ><MiniButton fullWidth={true} ><NavigateNextOutlined />Themeforest<NavigateBeforeOutlined /></MiniButton></Link>
          <Link className='mt-4' href="/codecanyon" ><MiniButton fullWidth={true} ><NavigateNextOutlined />CodeCanyon<NavigateBeforeOutlined /></MiniButton></Link>
          <Link className='mt-4' href="/graphicriver" ><MiniButton fullWidth={true} ><NavigateNextOutlined />Graphicriver<NavigateBeforeOutlined /></MiniButton></Link>
          <Link className='mt-4' href="/photodune" ><MiniButton fullWidth={true} ><NavigateNextOutlined />Photodune<NavigateBeforeOutlined /></MiniButton></Link>
          <Link className='mt-4' href="/videohive" ><MiniButton fullWidth={true} ><NavigateNextOutlined />Videohive<NavigateBeforeOutlined /></MiniButton></Link>
          <Link className='mt-4' href="/audiojungle" ><MiniButton fullWidth={true} ><NavigateNextOutlined />AudioJungle<NavigateBeforeOutlined /></MiniButton></Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
