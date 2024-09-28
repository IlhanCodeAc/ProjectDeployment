"use server"

import prisma from "../lib/db";

const GetByID = async ({ params }: { params: { id: string } }) => {
    const product = await prisma.product.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!product) {
        throw new Error("Product not found");
    }

    return product; 
};

export default GetByID;


import { revalidatePath } from "next/cache";


// export async function createProduct(data:Prisma.ProductCreateInput){
    
// }
export async function createProduct(data:FormData){
    console.log(data)
    const newProduct = {
        name: data.get("name") as string,
        image: data.get("image") as string,
        description: data.get("description") as string,
        price: Number(data.get("price")),
        sliderImageOne: data.get("sliderImageOne") as string,
        sliderImageTwo: data.get("sliderImageTwo") as string,
        sliderImageThree: data.get("sliderImageThree") as string,
        gameplayVideo: data.get("gameplayVideo") as string,
    };
    const product =await prisma.product.create({
        data:newProduct
    })
        

    
    revalidatePath("/products")
    return product
}
export const Filter = async (sortOrder: string) => {
    const orderBy = sortOrder === 'asc' ? 'asc' : 'desc';
  
    return await prisma.product.findMany({
      orderBy: [
        {
          price: orderBy,
        }
      ],
      
    });
  };
  