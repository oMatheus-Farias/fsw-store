import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import OrderProductItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computeProductTotalPrice } from "@/helpers/product";
import { getOrderStatus } from "../helpers/status";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      const productTotalPrice = computeProductTotalPrice(orderProduct.product);

      return acc + productTotalPrice * orderProduct.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscount = subtotal - total;

  return (
    <Card className="p-5">
      <Accordion
        type="single"
        className="w-full"
        collapsible
        defaultValue={order.id}
      >
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex w-full text-left">
              <div className="flex flex-1 flex-col gap-1 text-left">
                <p className="text-sm font-semibold uppercase lg:text-base">
                  {`Pedido com ${order.orderProducts.length} ${order.orderProducts.length > 1 ? "produtos" : "produto"}`}
                </p>
                <span className="text-xs opacity-60 lg:text-sm">
                  Feito em {format(order.createdAt, "dd/MM/yy 'às' HH:mm")}
                </span>
              </div>

              <div className="hidden flex-1 font-bold lg:block">
                <p className="text-xs lg:text-sm">Status</p>
                <p className="text-xs text-[#8162FF] lg:text-sm">
                  {getOrderStatus(order.status)}
                </p>
              </div>

              <div className="hidden flex-1 lg:block">
                <p className="text-xs font-bold lg:text-sm">Data</p>
                <p className="text-xs opacity-60 lg:text-sm">
                  {format(order.createdAt, "dd/MM/yy")}
                </p>
              </div>

              <div className="hidden flex-1 lg:block">
                <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                <p className="text-xs opacity-60 lg:text-sm">Cartão</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2 lg:hidden">
                <div className="font-bold">
                  <p className="text-xs lg:text-sm">Status</p>
                  <p className="text-xs text-[#8162FF] lg:text-sm">
                    {getOrderStatus(order.status)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold lg:text-sm">Data</p>
                  <p className="text-xs opacity-60 lg:text-sm">
                    {format(order.createdAt, "dd/MM/yy")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                  <p className="text-xs opacity-60 lg:text-sm">Cartão</p>
                </div>
              </div>

              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}

              <div className="flex w-full flex-col gap-1 text-xs">
                <Separator />

                <div className="flex w-full justify-between py-3 lg:text-sm">
                  <p>Subtotal</p>
                  <p>R$ {subtotal.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3 lg:text-sm">
                  <p>Entrega</p>
                  <p className="uppercase">Grátis</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3 lg:text-sm">
                  <p>Descontos</p>
                  <p>- R$ {totalDiscount.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3 text-sm font-bold lg:text-base">
                  <p>Total</p>
                  <p>R$ {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
