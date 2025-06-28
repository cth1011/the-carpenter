import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  alt: string;
  isSale?: boolean;
  objectFit?: "cover" | "contain";
}

const ProductCard: React.FC<Product> = ({
  title,
  price,
  imageUrl,
  alt,
  isSale = false,
  objectFit = "cover",
}) => {
  return (
    <div className="group">
      <Link href="#">
        <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={alt}
            layout="fill"
            objectFit={objectFit}
            className={`transition-transform duration-300 group-hover:scale-105 ${objectFit === "contain" ? "p-8" : ""}`}
            quality={80}
          />
          {isSale && (
            <div className="absolute top-2 -right-4 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider transform rotate-90">
              Sale
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-base">{title}</h3>
          <p className="text-gray-600 mt-1">{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
