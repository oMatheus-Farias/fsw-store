import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "@/actions/order";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { data } = useSession();

  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data) {
      //TODO: redirecionar para o login
      return;
    }

    const order = await createOrder(products, (data.user as any).id);

    const checkout = await createCheckout(products, order.id);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.37em] text-base uppercase"
        variant="heading"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="flex h-full flex-col gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={{
                    ...product,
                    totalPrice: computeProductTotalPrice(product),
                  }}
                />
              ))
            ) : (
              <p className="text-left font-semibold">
                Carrinho vazio. Vamos fazer compras?
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator />

          <div className="flex items-center justify-between text-xs lg:text-sm">
            <p>Subtotal</p>
            <p>{`R$ ${subtotal.toFixed(2)}`}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs lg:text-sm">
            <p>Entrega</p>
            <p className="uppercase">Grátis</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs lg:text-sm">
            <p>Descontos</p>
            <p>{`- R$ ${totalDiscount.toFixed(2)}`}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm font-bold lg:text-base">
            <p>Total</p>
            <p>{`R$ ${total.toFixed(2)}`}</p>
          </div>

          <Button
            className="mt-7 font-bold uppercase"
            onClick={handleFinishPurchaseClick}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
