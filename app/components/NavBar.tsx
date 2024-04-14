'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MidButton from './MidButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { NavigateNextOutlined, OpenInNew } from '@mui/icons-material';
import Image from 'next/image'
import Link from 'next/link'

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <div className='flex'>
        <div className='flex w-2/3 items-center py-4 px-4'>
          <MidButton size={'text-md md:text-md lg:text-md'} onClick={toggleDrawer(true)}>MENU</MidButton>
        </div>
        <div className='flex w-1/3 py-4 px-4 justify-end'>
          <Link href="/">
            <Image src="/images/android-icon-192x192.png" className='w-8 h-8' alt="android-icon-192x192" width={192} height={192} priority />
          </Link>
        </div>
      </div>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 250,
            background: 'radial-gradient(circle at top, #84cc16, #bef264)'
          },
        }}
      >

        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <div className='flex'>
            <div className='w-1/3 items-center py-4 px-4'>
              <Link href="/">
                <Image src="/images/android-icon-192x192.png" alt="android-icon-192x192" width={192} height={192} priority />
              </Link>
            </div>
            <div className='w-2/3'>
              <h2 className='p-6'>MENU</h2>
            </div>
          </div>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton href='/' className='text-lime-900'>
                <ListItemIcon><NavigateNextIcon /></ListItemIcon>Home page
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/themeforest' className='text-lime-800'>
                <ListItemIcon><NavigateNextIcon /></ListItemIcon>Themeforest
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/codecanyon' className='text-lime-800'>
                <ListItemIcon><NavigateNextIcon /></ListItemIcon>Codecanyon
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/graphicriver' className='text-lime-800'>
                <ListItemIcon><NavigateNextIcon /></ListItemIcon>Graphicriver
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/photodune' className='text-lime-800'>
                <ListItemIcon><NavigateNextIcon /></ListItemIcon>Photodune
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/videohive' className='text-lime-800'>
                <ListItemIcon><NavigateNextIcon /></ListItemIcon>Videohive
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/audiojungle' className='text-lime-800'>
                <ListItemIcon><NavigateNextIcon /></ListItemIcon>AudioJungle
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton href='/themeforest/category/wordpress' className='text-lime-700'>
                <ListItemIcon><NavigateNextIcon /></ListItemIcon>Wordpress
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/themeforest/category/wordpress/ecommerce/woocommerce' className='text-lime-700'>
                <ListItemIcon><NavigateNextIcon /></ListItemIcon>Woocommerce
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/themeforest/category/ecommerce/prestashop' className='text-lime-700'>
                <ListItemIcon><NavigateNextIcon /></ListItemIcon>Prestashop
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href='/themeforest/category/ecommerce/magento' className='text-lime-700'>
                <ListItemIcon><NavigateNextIcon /></ListItemIcon>Magento
              </ListItemButton>
            </ListItem>
            <img className="w-full object-cover p-6" alt='EnvatoMarket-Logo-Trans-Black' src="/images/logos/EnvatoMarket-Logo-Trans-Black.png" />
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
