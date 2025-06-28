// components/FeaturedProducts.tsx
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity"; // Assuming you have a urlFor function for Sanity images

// Define the shape of the product data
interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  mainImage: any; // You might want to define a more specific type for your image
  category: string;
}

const FeaturedProducts = ({ products }: { products: Product[] }) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">
          Featured Doors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product._id} href={`/product/${product.slug.current}`}>
              <a className="group block bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <div className="relative h-64">
                  {product.mainImage && (
                    <Image
                      src={urlFor(product.mainImage)
                        .width(400)
                        .height(400)
                        .url()}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-bold text-brand-dark">
                    {product.name}
                  </h3>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
