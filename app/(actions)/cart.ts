"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../lib/db";

export async function addToCart({productId,quantity}:{productId:string, quantity:number}){
    const Cart = await getCart();
    if (!Cart) return null
   
    let cartItem = await prisma.cartItem.findFirst({
        where:{
            productId,
            cartId: Cart.id,
        }
    })
    if(!cartItem){
     cartItem =await prisma.cartItem.create({
        data:{
            quantity,
            product:{
                connect:{
                    id:productId
                }
            },
            cart:{
                connect:{
                    id: Cart.id
                }
            }
        }
    })
}else{
    cartItem = await prisma.cartItem.update({
        where:{
            id:cartItem.id
        },
        data:{
            quantity:cartItem.quantity + quantity
        }
    })
}
    return cartItem
}

export async function getCart(){
    const {userId}= auth();
    if(!userId) return null;
    const user = await prisma.user.findUnique({
        where:{
            externalId:userId,
        },
        include:{
            Cart:true
                
        }
    })
    if(!user?.Cart) return null;
    return user?.Cart;
}
export async function getCartWithItems(){
    const {userId}= auth();
    if(!userId) return null;
    const user = await prisma.user.findUnique({
        where:{
            externalId:userId,
        },
        include:{
            Cart:{
                include:{
                    items:{
                        include:{
                            product:true,
                        }
                    }
                }
            }
                
        }
    })
    if(!user?.Cart) return null;
    return user?.Cart;
}

