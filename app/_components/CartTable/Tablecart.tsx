"use client"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import {  getCartWithItems } from '@/app/(actions)/cart';
import {cart, CartItem} from "@prisma/client"
import { SafeCart } from '@/types';
import style from "./style.module.scss"






export default function Carttable() {
  const [cart, setCart] = useState<SafeCart | null>(null);   
  useEffect(()=>{
      getCartWithItems().then((cart)=>{
        setCart(cart);
      }).catch((error)=>{
        console.error(error);
      })
    },[])
  return (
    <>
    <Container>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {cart?.items.map(({ product, }) => (
    <TableRow
      key={product.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <img className={style.CartProductImage} src={product.image} alt="" />
      </TableCell>
      <TableCell align="right">{product.name}</TableCell>
      <TableCell align="right">{product.price}</TableCell>
      <TableCell align="right"></TableCell> {/* Example usage of cartItem */}
      {/* Add more cells if needed */}
    </TableRow>
  ))}
</TableBody>
      </Table>
    </TableContainer>
    </Container>
    </>
  );
}