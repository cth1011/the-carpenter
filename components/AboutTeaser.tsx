// components/AboutTeaser.tsx
import Link from "next/link";

const AboutTeaser = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-brand-dark mb-4">
          Why Choose The Carpenter?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          We are a family-owned business dedicated to crafting the highest
          quality wooden doors with passion and precision.
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="feature-item">
            <h3 className="text-xl font-semibold mb-2">
              Unmatched Craftsmanship
            </h3>
            <p className="text-gray-500">
              Decades of experience in every detail, ensuring a product that is
              both beautiful and durable.
            </p>
          </div>
          <div className="feature-item">
            <h3 className="text-xl font-semibold mb-2">Premium Solid Wood</h3>
            <p className="text-gray-500">
              We use only sustainably sourced, high-grade solid wood for lasting
              beauty and strength.
            </p>
          </div>
          <div className="feature-item">
            <h3 className="text-xl font-semibold mb-2">Bespoke Designs</h3>
            <p className="text-gray-500">
              Your vision, brought to life by our artisans. We create custom
              doors tailored to your exact specifications.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Link
            aria-label="Learn more about the Carpenters"
            href="#"
            className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
