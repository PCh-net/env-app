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
              <Link href="/" ><MiniButton fullWidth={true} >Home page</MiniButton></Link>
              <Link href="/themeforest" className='pl-2' ><MiniButton fullWidth={true} >Themeforest</MiniButton></Link>
              <Link href="/codecanyon" className='pl-2' ><MiniButton fullWidth={true} >Codecanyon</MiniButton></Link>
              <Link href="/graphicriver" className='pl-2' ><MiniButton fullWidth={true} >Graphicriver</MiniButton></Link>
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
