"use client"

import React from 'react';
import { Container } from '@mui/material';

export default  function Homecards(){
    // const products = await prisma.homeProducts.findMany();
    return (
    <>
        <Container>
            {/* {products.map((product) => (
                <div className={style.ProductContainer} key={product.id}>
                    <div className={style.ProductCard}>
                        
                        <img className={style.ProductImage} src={product.image} alt={product.name} />
                        <div className={style.ProductCardFooter}>
                            <div className={style.ProductInfo}>
                                <h2 className={style.ProductName}>{product.name}</h2>
                                <h2 className={style.ProductPrice}>{product.price}$</h2>
                            </div>
                        </div>
                    </div>
                    <div className={style.HomeModal}>

                        <div className={style.ModalImages}>
                            <img src={product.sliderImageOne} alt="" />
                            <img src={product.sliderImageTwo} alt="" />
                            <img src={product.sliderImageThree} alt="" />
                        </div>

                    </div>
                </div>
            ))} */}
            <h1>hi</h1>
        </Container>
        </>
    );
}
