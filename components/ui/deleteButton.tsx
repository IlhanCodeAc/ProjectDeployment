"use client";
import React from 'react';
import { Button } from './button';
import { deleteProduct } from '@/app/(actions)/product';

interface DeleteButtonProps {
    id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
    console.log(props)
    return (
        <Button onClick={() => deleteProduct(props.id)}>
            Delete
        </Button>
    );
};

export default DeleteButton;
