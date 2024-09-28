"use client";
import React from 'react';
import { deleteProduct } from '@/app/(actions)/product';
import prisma from '@/app/lib/db';
import style from "./style.module.scss"
import { Button } from '@mui/material';

interface DeleteButtonProps {
    id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
    console.log(props)
    return (
        <Button className={style.Delete} variant="outlined" color="error" onClick={() => deleteProduct(props.id)}>
        DELETE
      </Button>
    );
};

export default DeleteButton;