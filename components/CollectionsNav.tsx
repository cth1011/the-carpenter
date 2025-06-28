import Link from "next/link";

export default function CollectionsNav() {
  const navItems = [
    "Shop Doors",
    "Custom Orders",
    "Our Craft",
    "Materials & Finishes",
    "Nationwide Delivery",
    "About Us",
  ];

  return (
    <nav className="border-y border-gray-200 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap w-max">
        {/* First set of items */}
        <div className="flex flex-shrink-0 w-max justify-around">
          {navItems.map((item, index) => (
            <span key={`first-${item}-${index}`} className="flex-shrink-0">
              <Link
                href="#"
                className="inline-block py-3 px-5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black"
              >
                {item}
              </Link>
              {index < navItems.length - 1 && (
                <span className="text-gray-300">•</span>
              )}
            </span>
          ))}
        </div>
        {/* Second set of items (identical to the first) */}
        <div className="flex flex-shrink-0 w-max justify-around">
          {navItems.map((item, index) => (
            <span key={`second-${item}-${index}`} className="flex-shrink-0">
              <Link
                href="#"
                className="inline-block py-3 px-5 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black"
              >
                {item}
              </Link>
              {index < navItems.length - 1 && (
                <span className="text-gray-300">•</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}