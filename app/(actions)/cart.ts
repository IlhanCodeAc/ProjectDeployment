"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../lib/db";

export async function addToCart(){
    const {userId}= auth();
}

export async function getCart(){
    const {userId}= auth();
    if(!userId) return null;
    const user = await prisma.user.findUnique({
        where:{
            externalId:userId,
        },
        include:{
            Cart:{
                include:{
                    product:true
                },
            }
        }
    })
}