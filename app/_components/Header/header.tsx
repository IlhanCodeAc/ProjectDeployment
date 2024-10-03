'use client'

import React from 'react'
import style from './styles.module.scss'
import { Container } from '@mui/material'
import Image from 'next/image';
import phoenixLogo from './372-3728490_red-and-black-b-logo-gaming-logos-red.png';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { UserButton } from '@clerk/nextjs';






const Header = () => {

  return (
    
    <div className={style.NavContainer}>
        
        <Container>
            <div className={style.nav}>
            <Link href={'/'} className={style.NavLeft}>
            <Image
        src={phoenixLogo}
        alt="Phoenix Logo"
        width={50} 
        height={50} 
      />
      <h3 className={style.LogoName}>Fiery Nest</h3>
            </Link>
            <div className={style.Right}>
                <Link href="/products">Games</Link>
                <Link href="/Cart">Cart</Link>
                <Link href="/Creation">Add new game</Link>
                <Link href={"/sign-up"}>Sign Up</Link>
                <UserButton/>
            </div>
            </div>
        </Container>
    </div>
    
  )
}

export default Header