"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductCard, { Product } from "./ProductCard";
import Link from "next/link";

interface ProductGridProps {
  title: string;
  products: Product[];
  viewCollectionLink: string;
}

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    className="group/link tracking-wider relative pb-1 text-xs font-semibold uppercase transition-all"
  >
    {children}
    <span className="absolute bottom-0 left-0 block h-px w-full max-w-0 bg-black transition-all duration-500 group-hover/link:max-w-full" />
  </Link>
);

const ProductGrid: React.FC<ProductGridProps> = ({
  title,
  products,
  viewCollectionLink,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight">
            {title}
          </h2>
          <NavLink href={viewCollectionLink}>View All</NavLink>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;
