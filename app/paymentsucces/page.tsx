import { Container } from '@mui/material'
import React from 'react'
import Ok from "./OK-512.webp"
import Image from 'next/image'
import style from './style.module.scss'

const Succespayment = () => {
  return (
        <Container>
    <div className={style.SuccessContainer}>
            <h1>Payment Succesfull</h1>
            <Image src={Ok} alt='Ok pic' width={50} height={50}/>
            
    </div>

        </Container>
  )
}

export default Succespayment