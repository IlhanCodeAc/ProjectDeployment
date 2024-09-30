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
import { getCartWithItems, removeFromCart } from '@/app/(actions)/cart';
import { SafeCart } from '@/types';
import style from "./style.module.scss";
import { createCheckoutSession } from '@/app/(actions)/checkout';
import trash from "./icons8-trash-48.png"
import Image from 'next/image';

export default function Carttable() {
    const [cart, setCart] = useState<SafeCart | null>(null);

    useEffect(() => {
        getCartWithItems()
            .then((cart) => {
                setCart(cart as SafeCart);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const total = cart ? cart.items.reduce((acc, item) => item.product.price * item.quantity + acc, 0) : 0;

    async function handleCheckout() {
        const { url } = await createCheckoutSession(total);
        window.location.assign(url as string);
    }

    async function handleRemove(cartItemId: string) {
        await removeFromCart({ cartItemId });
        const updatedCart = await getCartWithItems();
        setCart(updatedCart as SafeCart);
    }

    return (
        <Container>
            <TableContainer className={style.Table} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart ? (
                            cart.items.length > 0 ? (
                                cart.items.map(({ id, product }) => ( 
                                    <TableRow
                                        key={id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <img className={style.CartProductImage} src={product.image} alt="" />
                                        </TableCell>
                                        <TableCell align="right">{product.name}</TableCell>
                                        <TableCell align="right">${product.price}</TableCell>
                                        <TableCell align="right">
                                            <button
                                                onClick={() => handleRemove(id)} 
                                                type="button"
                                                
                                                className={style.DeleteBtn}
                                            >
                                                <Image
                                                    
                                                    src={trash}
                                                    alt="Phoenix Logo"
                                                    width={40} 
                                                    height={40} 
                                                  />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">Your cart is empty.</TableCell>
                                </TableRow>
                            )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">Loading...</TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell align="right" colSpan={2}><strong>Total:</strong></TableCell>
                            <TableCell align="right"><strong>${total}</strong></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Checkout Button */}
            <div className="mt-4 flex justify-center">
                <button
                    onClick={handleCheckout}
                    className={style.CheckoutBtn}
                >
                    Checkout
                </button>
            </div>
        </Container>
    );
}
