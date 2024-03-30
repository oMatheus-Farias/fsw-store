import { computeProductTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const productTotalPrice = computeProductTotalPrice(orderProduct.product);

  return (
    <div className="relative flex w-full items-center gap-4">
      <div className="flex h-[77px] w-[100px] items-center justify-center rounded-lg bg-accent lg:aspect-square lg:h-[130px] lg:w-[150px]">
        <Image
          src={orderProduct.product.imageUrls[0]}
          alt={orderProduct.product.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
        />
      </div>

      <div className="flex w-full flex-col gap-1 lg:gap-2">
        <div className="flex w-fit rounded-md bg-accent px-3 py-1">
          <p className="text-[10px] lg:text-xs">
            Vendido e entregue por
            <span className="font-bold italic"> FSW Store</span>
          </p>
        </div>
        <p className="text-xs lg:text-base">{orderProduct.product.name}</p>

        <div className="flex items-center justify-between gap-1">
          <div className="bottom-0 flex flex-col items-center justify-center gap-1 lg:absolute lg:right-0 lg:top-0 lg:items-end lg:justify-items-end">
            <p className="text-sm font-bold lg:text-xl">
              R$ {productTotalPrice.toFixed(2)}
            </p>

            {orderProduct.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60 lg:text-sm">
                R$ {Number(orderProduct.basePrice).toFixed(2)}
              </p>
            )}
          </div>

          <p className="text-xs opacity-60 lg:hidden">
            Qntd: {orderProduct.quantity}
          </p>
          <p className="hidden text-sm opacity-60 lg:block">
            Quantidade: {orderProduct.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
