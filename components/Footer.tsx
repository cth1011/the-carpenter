"use client";
import { easeIn, motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const footerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        easeIn,
      },
    },
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <motion.footer
      ref={ref}
      variants={footerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-gray-50 border-t border-gray-200 text-gray-800"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-black tracking-wide uppercase">
              The Carpenter
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Timeless Design. Lasting Strength.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Company
              </h4>
              <ul className="mt-4 space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                Shop
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/collections/all"
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    All Doors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/interior"
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Interior
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/exterior"
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    Exterior
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-gray-500 hover:text-black">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-black">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-black">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} The Carpenter. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
