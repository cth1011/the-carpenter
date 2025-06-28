import Hero from "@/components/Hero";
import CollectionIntro from "@/components/CollectionsIntro";
import CollectionsNav from "@/components/CollectionsNav";
import ProductGrid from "@/components/ProductGrid";
import Banner from "@/components/Banner";
import TwoColumnContent from "@/components/TwoColumnContent";
import Features from "@/components/Features";

// Dummy data for product grids
const latestProducts = [
  {
    id: 1,
    title: "Wooden Door",
    price: "₱130",
    imageUrl:
      "https://images.unsplash.com/photo-1536160885591-301854e2ed04?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Wooden Door",
  },
  {
    id: 2,
    title: "Wooden Door",
    price: "₱130",
    imageUrl:
      "https://images.unsplash.com/photo-1536160885591-301854e2ed04?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Wooden Door",
  },
  {
    id: 3,
    title: "Wooden Door",
    price: "₱80",
    imageUrl:
      "https://images.unsplash.com/photo-1536160885591-301854e2ed04?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Wooden Door",
    isSale: true,
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <TwoColumnContent />
      <CollectionIntro />
      <CollectionsNav />
      <ProductGrid
        title="Latest & Greatest"
        products={latestProducts}
        viewCollectionLink="#"
      />
      <Banner />

      <Features />
    </>
  );
}
