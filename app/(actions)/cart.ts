'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

import prisma from '../lib/db';
import { Category } from '@prisma/client';
export async function getCart() {
  const { userId } = auth();
  if (!userId) throw new Error('No user ID found');
  const user = await prisma.user.findUnique({
    where: { externalId: userId },
    include: { Cart: true },
  });
  if (!user?.Cart) throw new Error('No Cart found');
  return user.Cart;
}

export async function getCartWithItems() {
  const { userId } = auth();
  if (!userId) throw new Error('No user ID found');
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
    include: {
      Cart: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!user?.Cart) throw new Error('No Cart found');

  return user?.Cart;
}

export async function addToCart({ productId, quantity }: { productId: string; quantity: number }) {
  const Cart = await getCart();

  let CartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      cartId: Cart.id,
    },
  });
  if (!CartItem) {
    CartItem = await prisma.cartItem.create({
      data: {
        quantity,
        product: {
          connect: {
            id: productId,
          },
        },
        cart: {
          connect: {
            id: Cart.id,
          },
        },
      },
    });
  } else {
    CartItem = await prisma.cartItem.update({
      where: {
        id: CartItem.id,
      },
      data: {
        quantity: CartItem.quantity + quantity,
      },
    });
  }


  return CartItem;
}

export async function removeFromCart({ cartItemId }: { cartItemId: string }) {
  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });

  revalidatePath("/");
}
export const getCategories = async (): Promise<Category[]> => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return categories as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Unable to fetch categories");
  }
};