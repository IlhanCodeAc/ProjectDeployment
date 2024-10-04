
import React from 'react';
import style from './styles.module.scss';
import { Container } from '@mui/material';
import Image from 'next/image';
import phoenixLogo from './372-3728490_red-and-black-b-logo-gaming-logos-red.png';
import Link from 'next/link';
import { UserButton} from '@clerk/nextjs';
import { ROLE } from '@prisma/client';
import { RenderIf } from '../RenderIf/RenderIf';
import prisma from '@/app/lib/db';
import { auth } from '@clerk/nextjs/server';

interface HeaderProps {
  user?: {
    role: string; 
  };
}

const Header: React.FC<HeaderProps> = async ({ }) => {
  
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
  });
  const isAdmin = user?.role === ROLE.Admin;
  return (
    <>
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
            <RenderIf condition ={isAdmin}>
            <Link href="/Creation">Add new game</Link>
            </RenderIf>
            {/* {!isSignedIn && (
              <>
                <Link href="/sign-up">Sign Up</Link>
                <Link href="/sign-in">Sign In</Link>
              </>
            )} */}
            <UserButton />
          </div>
        </div>
      </Container>
    </div>
    </>
  );
}

export default Header;
