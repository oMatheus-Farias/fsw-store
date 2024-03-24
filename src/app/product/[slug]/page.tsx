import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-image";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug,
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <ProductImages name={product.name} imageUrls={product.imageUrls} />
      <ProductInfo product={computeProductTotalPrice(product)} />
    </div>
  );
};

export default ProductDetailsPage;
