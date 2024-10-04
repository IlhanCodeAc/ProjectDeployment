import { Container } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import style from './style.module.scss'
import Failure from "./failure-icon-512x512-0az3l8nm.png"

const Failurepayment = () => {
  return (
        <Container>
    <div className={style.FailuresContainer}>
            <h1>Oh-oh...Something went wrong</h1>
            <Image src={Failure} alt='Ok pic' width={50} height={50}/>
            
    </div>

        </Container>
  )
}

export default Failurepayment