import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../../components/ui/product-list";
import SectionTitle from "../../../components/ui/section.title";
import PromoBanner from "./components/promo-banner";
import Link from "next/link";

const Home = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <>
      <div className="mx-auto max-w-[1920px]">
        <Link href="/deals">
          <PromoBanner
            src="/deals-banner.png"
            alt="Até 55% de desconto só esse mês"
            priority
            className="hidden h-auto w-full lg:block"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-8 py-8 lg:container lg:gap-10">
        <Link href="/deals">
          <PromoBanner
            src="/banner-home-01.png"
            alt="Até 55% de desconto só esse mês"
            priority
            className="p-5 lg:hidden"
          />
        </Link>

        <div className="mt-2 p-5">
          <Categories />
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Ofertas</SectionTitle>
          <ProductList products={deals} />
        </div>

        <div className="flex flex-col lg:flex-row">
          <Link href="/category/mouses" className="flex flex-1">
            <PromoBanner
              src="/banner-home-02.png"
              alt="Até 55% de desconto em mouses"
              className="p-5 lg:w-0 lg:flex-1 lg:p-0 lg:pr-5"
            />
          </Link>

          <Link href="/category/headphones" className="flex flex-1">
            <PromoBanner
              src="/banner-home-03.png"
              alt="Até 20% de desconto em fones"
              className="hidden lg:block lg:w-0 lg:flex-1"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Teclados</SectionTitle>
          <ProductList products={keyboards} />
        </div>

        <div>
          <Link href="/category/headphones">
            <PromoBanner
              src="/banner-home-03.png"
              alt="Até 20% de desconto em fones"
              className="p-5 lg:hidden"
            />
          </Link>

          <Link href="/catalog">
            <PromoBanner
              src="/free-shipping-banner.png"
              alt="Frete grátis para todo o Brasil"
              className="hidden px-5 lg:block"
            />
          </Link>
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Mouses</SectionTitle>
          <ProductList products={mouses} />
        </div>
      </div>
    </>
  );
};

export default Home;
