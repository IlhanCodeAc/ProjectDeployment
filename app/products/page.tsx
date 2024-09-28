import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import { Cards } from '../_components/productCards/cards';
import style from './style.module.scss'
import Dropdown from '../_components/Dropdown/Dropdown';
import { SortOrder } from '@/types';
import prisma from '../lib/db';

type Props = {
  searchParams?: {
    sort: string;
    [key: string]: string;
  };
};


const Product = async ({searchParams}:Props) => {
  const orderBy: Record<string, string> = {};
  const  sort  = searchParams?.sort as  SortOrder
      

  if (sort) {
      const searchKey = sort.split('-')[0];
      const searchValue = sort.split('-')[1];
      orderBy[searchKey] = searchValue;
  }

  console.log(orderBy);
  
  const products = await prisma.product.findMany({
      orderBy: orderBy 
  });
  return (
    <>
    <Dropdown/>

    <Cards products={products} />
    
    </>        
  )
}

export default Product