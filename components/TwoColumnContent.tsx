"use client";

import Image from "next/image";
import Button from "./Button";
import { easeIn, motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export default function TwoColumnContent() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4, // Trigger when 10% of the component is visible
  });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, easeIn, delay: 0.2 },
    },
  };

  return (
    <section
      ref={ref}
      className="bg-gray-100 py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight">
            Half a Century of Craft
          </h2>
          <p className="mt-6 text-gray-600 max-w-md mx-auto md:mx-0">
            For over five decades, The Carpenter has built a legacy of
            excellence in woodworking—shaping homes with doors that stand the
            test of time. Each piece we craft is rooted in traditional
            techniques, refined through years of experience, and made with a
            deep respect for the natural beauty of wood. We honor the past not
            by standing still, but by continuously raising the standard for
            quality, design, and durability in every door we deliver.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <Button href="/" aria-label="Learn More">
              Learn More
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={imageVariants}
          className="relative aspect-[4/5]"
        >
          <Image
            src="https://images.unsplash.com/photo-1682450195449-32ab08ddf7e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29vZCUyMGNhcnBlbnRlciUyMGRvb3JzfGVufDB8fDB8fHww"
            alt="Person on skateboard in a concrete bowl"
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
