import React from 'react'
import style from "./style.module.scss"
import { Container } from '@mui/material'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
    <div className={style.footerCont}>
        <Container>
            <div className={style.leftFooter}>
                <h3 className={style.FooterMainText}>GurcuKhinkali</h3>
                <h5 className={style.FooterText}>The store that you are currently checking was made by the @GurcuKhinkali corporation in 2024</h5>
            <div className={style.Links}>
                <Link href={"https://www.instagram.com/stormknight5577?igsh=MXB3bXR1cTQybTg3dA=="}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" alt="" />
                </Link>
                <Link href={"https://discordapp.com/users/aze_stormknight#3994/"}><img src="https://static.vecteezy.com/system/resources/previews/018/930/500/original/discord-logo-discord-icon-transparent-free-png.png" alt="" /></Link>
            </div>
            </div>
        </Container>
    </div>
    </>
)
}

export default Footer