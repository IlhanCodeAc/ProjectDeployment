"use server";

import {  Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "../lib/db";
import Swal from "sweetalert2";
import { redirect } from 'next/navigation'

// export async function createProduct(data:Prisma.ProductCreateInput){
    
// }
export async function createProduct(data:Product){
    const newProduct = {
        name: data.name,
        image: data.image,
        description: data.description,
        price: Number(data.price),
        sliderImageOne: data.sliderImageOne,
        sliderImageTwo: data.sliderImageTwo,
        sliderImageThree: data.sliderImageThree,
        gameplayVideo: data.gameplayVideo,
    };
    console.log(newProduct);
    
    const product =await prisma.product.create({
        data:newProduct
    })
        
Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    
    revalidatePath("/products")
    return product
}
export async function deleteProduct(id:string){
    
    
    const product= await prisma.product.delete({
        where:{
            id
        }
        
    })
    console.log(product)
    
    
    revalidatePath("/products")
    redirect("/products")
    return product
}

export const Filter = async (sortOrder: string) => {
    const orderBy = sortOrder === 'asc' ? 'asc' : 'desc';
  
    return await prisma.product.findMany({
      orderBy: [
        {
          price: orderBy,
        },
      ],
    });
  };