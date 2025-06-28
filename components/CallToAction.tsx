// components/CallToAction.tsx
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="bg-brand-primary py-20 text-center text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">Ready to find the perfect door for your home?</h2>
        <p className="text-lg mb-8">Let our experts help you choose a door that fits your style and budget.</p>
        <Link href="/quote" className="bg-white text-brand-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors">
            Request a Free Quote Today
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
