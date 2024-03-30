import { prismaClient } from "@/lib/prisma";

const ProductsPage = async () => {
  const products = await prismaClient.product.findMany({});

  console.log(products);

  return (
    <div>
      <h1>products</h1>
    </div>
  );
};

export default ProductsPage;
