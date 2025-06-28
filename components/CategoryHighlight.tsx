// components/CategoryHighlight.tsx
import Link from 'next/link';

// This component needs to know the shape of the category data
interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

const CategoryHighlight = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="bg-brand-cream py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">Explore Our Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category._id} href={`/category/${category.slug.current}`} className="group block bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <div className="h-48 bg-gray-300 group-hover:opacity-80 transition-opacity"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-dark">{category.title}</h3>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlight;
