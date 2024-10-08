import React from 'react';
import 'swiper/css';
import { Cards } from '../_components/productCards/cards';
import { SortOrder } from '@/types';
import prisma from '../lib/db';
import style from "./style.module.scss";
import Sidebar from '../_components/Sidebar/Sidebar';

type Props = {
  searchParams?: {
    sort?: string;
    page?: string; 
    limit?: string; 
    category?: string;
    [key: string]: string | undefined;
  };
};

const Product = async ({ searchParams }: Props) => {
  const orderBy: Record<string, string> = {};
  const sort = searchParams?.sort as SortOrder;

  const page = parseInt(searchParams?.page || '1', 10);
  const limit = 9; 
  
  if (sort) {
    const searchKey = sort.split('-')[0];
    const searchValue = sort.split('-')[1];
    orderBy[searchKey] = searchValue;
  }

  const categories = searchParams?.category ? searchParams.category.split(',') : [];
  const categoryFilter = categories.length ? { category: { name: { in: categories } } } : {};

  const products = await prisma.product.findMany({
    where: categoryFilter,
    orderBy: orderBy,
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalProducts = await prisma.product.count({ where: categoryFilter });
  const totalPages = Math.ceil(totalProducts / limit); 

  return (
    <>
      <Sidebar />
      <Cards products={products} />

      <div className={style.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <a 
            key={index + 1}
            href={`?sort=${searchParams?.sort}&page=${index + 1}&limit=${limit}`} // Preserve filters
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
