import { cn } from "@/lib/utils";
import { ImageProps } from "next/image";
import Image from "next/image";

const PromoBanner = ({ alt, className, ...props }: ImageProps) => {
  return (
    <Image
      width={0}
      height={0}
      sizes="100vw"
      className={cn("h-auto w-full", className)}
      priority
      alt={alt}
      {...props}
    />
  );
};

export default PromoBanner;
