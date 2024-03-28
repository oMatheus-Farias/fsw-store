"use server";

import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";

export const createOrder = async (
  cartProducts: CartProduct[],
  userId: string,
) => {
  const order = await prismaClient.order.create({
    data: {
      userId,
      status: "WAITING_FOR_PAYMENT",
      orderProducts: {
        createMany: {
          data: cartProducts.map((products) => ({
            basePrice: products.basePrice,
            discountPercentage: products.discountPercentage,
            productId: products.id,
            quantity: products.quantity,
          })),
        },
      },
    },
  });

  return order;
};
