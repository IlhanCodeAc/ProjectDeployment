import React from 'react';
import 'swiper/css';
import { Cards } from '../_components/productCards/cards';
import Dropdown from '../_components/Dropdown/Dropdown';
import { SortOrder } from '@/types';
import prisma from '../lib/db';
import style from "./style.module.scss"

type Props = {
  searchParams?: {
    sort?: string;
    page?: string; // Added page parameter
    limit?: string; // Added limit parameter
    [key: string]: string | undefined;
  };
};

const Product = async ({ searchParams }: Props) => {
  const orderBy: Record<string, string> = {};
  const sort = searchParams?.sort as SortOrder;
  
  // Default values
  const page = parseInt(searchParams?.page || '1', 10);
  const limit = parseInt(searchParams?.limit || '10', 10);
  
  if (sort) {
    const searchKey = sort.split('-')[0];
    const searchValue = sort.split('-')[1];
    orderBy[searchKey] = searchValue;
  }

  console.log(orderBy);

  // Fetching products with pagination
  const products = await prisma.product.findMany({
    orderBy: orderBy,
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalProducts = await prisma.product.count(); // Get total count of products
  const totalPages = Math.ceil(totalProducts / limit); // Calculate total pages

  return (
    <>
      <Dropdown />

      <Cards products={products} />

      <div className={style.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <a 
            key={index + 1}
            href={`?sort=${searchParams?.sort}&page=${index + 1}&limit=${limit}`}
            className={style.paginationBtn}
          >
            {index + 1}
          </a>
        ))}
      </div>
    </>
  );
};

export default Product;
