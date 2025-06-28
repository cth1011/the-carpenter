import Image from "next/image";
import Button from "./Button";

const collections = [
  {
    name: 'Modern',
    href: '/collections/modern',
    imageSrc: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'A modern, sleek door.',
  },
  {
    name: 'Classic',
    href: '/collections/classic',
    imageSrc: 'https://images.unsplash.com/photo-1600585154340-be6164a83639?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'A timeless, classic door.',
  },
  {
    name: 'Rustic',
    href: '/collections/rustic',
    imageSrc: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'A charming, rustic door.',
  },
];

export default function Collections() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8">
          {collections.map((collection) => (
            <div key={collection.name} className="group relative">
              <div className="aspect-w-4 aspect-h-3 h-80 w-full overflow-hidden rounded-lg">
                <Image
                  src={collection.imageSrc}
                  alt={collection.imageAlt}
                  layout="fill"
                  objectFit="cover"
                  className="transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                <a href={collection.href}>
                  <span className="absolute inset-0" />
                  {collection.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">Explore the Collection</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button href="/shop">View All Products</Button>
        </div>
      </div>
    </div>
  );
}
