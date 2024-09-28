
import React from 'react';
import style from './style.module.scss';
import { Container } from '@mui/material';
import Link from 'next/link';
import DeleteButton from '../Delete/Delete';
import { Product } from '@prisma/client';

type Props = {
    products: Product[]
}

export async function Cards({ products }: Props): Promise<React.JSX.Element> {
 

    return (
        <Container>
            <div className={style.ProductContainer}>
                {products.map((product) => (
                    <div className={style.ProductCard} key={product.id}>
                        <img className={style.ProductImage} src={product.image} alt={product.name} />
                        <div className={style.ProductCardFooter}>
                            <div className={style.ProductInfo}>
                                <h2 className={style.ProductName}>{product.name}</h2>
                                <h2 className={style.ProductPrice}>{product.price}$</h2>
                            </div>
                            <div className={style.ProductButtons}>
                                <button className={style.SendToCart}>Add To Cart</button>
                                <Link href={`/products/${product.id}`} className={style.readMoreCard}>
                                    Read More
                                </Link>
                            </div>
                        </div>
                        <div className={style.ProductModal}>
                            <div className={style.ModalImages}>
                                <img src={product.sliderImageOne} alt="" />
                                <img src={product.sliderImageTwo} alt="" />
                                <img src={product.sliderImageThree} alt="" />
                            </div>
                            <div className={style.modalInfo}>
                                <h2 className={style.ProductName}>{product.name}</h2>
                                <h2 className={style.ProductPrice}>{product.price}$</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
