import { Container } from '@mui/material';
import React from 'react';
import style from './style.module.scss';
import 'swiper/css';
import 'swiper/css/autoplay'; 
import "swiper/css/navigation";
import "swiper/css/pagination";
import Mainswiper from './_components/Swipers/Mainswiper';
import { Product } from '@prisma/client';
import { Cards } from './_components/productCards/cards';
import prisma from './lib/db';

type SortOrder = 'asc' | 'desc';
type Props = {
  searchParams?: {
    sort: string; 
    [key: string]: string;
  };
}

async function Home({  searchParams }: Props) {
  const orderBy: Record<string, SortOrder> = {};
  const sort = searchParams?.sort as SortOrder;

  if (sort) {
    const [searchKey, searchValue] = sort.split('-');
    orderBy[searchKey] = searchValue as SortOrder; 
  }

  console.log(orderBy);

  const fetchedProducts = await prisma.product.findMany({
    orderBy: orderBy 
  });

  return (
    <>
      <div className={style.swiperContainer}>
        <Mainswiper />
      </div>
      <Container>
        <h2 className={style.NewDeals}>NEW DEALS</h2>
        <Cards products={fetchedProducts} />
      </Container>
    </>
  );
}

export default Home;
