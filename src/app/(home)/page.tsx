import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import SectionTitle from "../../components/ui/section.title";
import PromoBanner from "./components/promo-banner";

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
        <Image
          src="/deals-banner.png"
          alt="Até 55% de desconto só esse mês"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className="hidden h-auto w-full lg:block"
        />
      </div>

      <div className="flex flex-col gap-8 py-8 lg:container lg:gap-10">
        <PromoBanner
          src="/banner-home-01.png"
          alt="Até 55% de desconto só esse mês"
          priority
          className="lg:hidden"
        />

        <div className="mt-2 p-5">
          <Categories />
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Ofertas</SectionTitle>
          <ProductList products={deals} />
        </div>

        <div className="flex flex-col lg:flex-row">
          <PromoBanner
            src="/banner-home-02.png"
            alt="Até 55% de desconto em mouses"
            className="lg:w-0 lg:flex-1"
          />

          <PromoBanner
            src="/banner-home-03.png"
            alt="Até 20% de desconto em fones"
            className="hidden lg:block lg:w-0 lg:flex-1"
          />
        </div>

        <div className="flex flex-col gap-3 lg:gap-5">
          <SectionTitle className="pl-5">Teclados</SectionTitle>
          <ProductList products={keyboards} />
        </div>

        <div>
          <PromoBanner
            src="/banner-home-03.png"
            alt="Até 20% de desconto em fones"
            className="lg:hidden"
          />

          <PromoBanner
            src="/free-shipping-banner.png"
            alt="Frete grátis para todo o Brasil"
            className="hidden lg:block"
          />
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
