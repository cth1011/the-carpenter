'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Hammer, Truck, Ruler } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Hammer className="h-8 w-8 mx-auto text-gray-400" />,
      title: 'Crafted by Skilled Artisans',
      description:
        'Every door is meticulously made by experienced craftsmen using time-tested techniques and premium wood — ensuring long-lasting beauty and structural integrity.',
    },
    {
      icon: <Truck className="h-8 w-8 mx-auto text-gray-400" />,
      title: 'Delivered Wherever You Build',
      description:
        'From cities to remote provinces, we ship across the Philippines with care and reliability — so your order arrives on time and in perfect condition.',
    },
    {
      icon: <Ruler className="h-8 w-8 mx-auto text-gray-400" />,
      title: 'Built for Your Vision',
      description:
        'Choose from a variety of styles, finishes, and sizes — or work with us to create custom doors that match your exact specifications.',
    },
  ];

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
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      ref={ref}
      className="bg-white py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-12 text-center"
      >
        {features.map(feature => (
          <motion.div key={feature.title} variants={itemVariants}>
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-sm font-bold uppercase tracking-wider">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
