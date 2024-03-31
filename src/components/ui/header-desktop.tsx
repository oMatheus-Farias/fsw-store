"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  PackageSearchIcon,
  PercentIcon,
  ShoppingCartIcon,
  UserRoundIcon,
} from "lucide-react";
import { Button } from "./button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import Cart from "./cart";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const HeaderDesktop = () => {
  const { status, data } = useSession();

  const { products } = useContext(CartContext);

  const handleQuantityProductsCart = () => {
    return products.reduce((acc, product) => acc + product.quantity, 0);
  };

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <header className="hidden min-h-[116px] w-full items-center justify-between bg-background lg:container lg:mx-auto lg:flex">
      <Link href="/">
        <p className="text-2xl font-bold text-primary">
          FSW <span className="text-white">Store</span>
        </p>
      </Link>

      <div className="flex items-center gap-8 font-semibold text-white">
        <Link href="/">
          <button>Home</button>
        </Link>

        <div className="h-6 w-[3px] rounded bg-accent"></div>

        <Link href="/catalog">
          <button>Catálogo</button>
        </Link>

        <div className="h-6 w-[3px] rounded bg-accent"></div>

        <Link href="/deals">
          <button>Ofertas</button>
        </Link>
      </div>

      <div className="flex items-center gap-7">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <UserRoundIcon />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader className="text-left text-lg font-semibold">
              Menu
            </SheetHeader>

            {status === "authenticated" && data?.user && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-4">
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>

                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="font-medium">{data.user.name}</p>
                    <p className="text-sm opacity-75">Boas compras!</p>
                  </div>
                </div>
                <Separator />
              </div>
            )}

            <div className="mt-4 flex flex-col gap-2">
              {status === "unauthenticated" && (
                <Button
                  onClick={handleLoginClick}
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogInIcon size={16} />
                  Fazer Login
                </Button>
              )}

              {status === "authenticated" && (
                <Button
                  onClick={handleLogoutClick}
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogOutIcon size={16} />
                  Fazer Logout
                </Button>
              )}

              <SheetClose asChild>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <HomeIcon size={16} />
                    Início
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/orders">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <PackageSearchIcon size={16} />
                    Meus pedidos
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/deals">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <PercentIcon size={16} />
                    Ofertas
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/catalog">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <ListOrderedIcon size={16} />
                    Catálogo
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="relative">
              {products.length > 0 && (
                <span className="absolute right-[calc(-1.25rem/2)] top-[calc(-1.25rem/2)] flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-sm font-bold">
                  {handleQuantityProductsCart()}
                </span>
              )}
              <ShoppingCartIcon />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[90%] lg:w-[40%] lg:max-w-[40%]"
          >
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default HeaderDesktop;
