import { ImageProps } from "next/image";
import Image from "next/image";

const PromoBanner = ({ alt, ...props }: ImageProps) => {
  return (
    <Image
      width={0}
      height={0}
      sizes="100vw"
      className="h-auto w-full p-5"
      priority
      alt={alt}
      {...props}
    />
  );
};

export default PromoBanner;
