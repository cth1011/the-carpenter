"use client";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import Button from "./Button";

export default function CollectionIntro() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 bg-center bg-cover bg-no-repeat text-center px-4 bg-[url('https://plus.unsplash.com/premium_photo-1680108242208-ee7c22b63d87?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdvb2QlMjBkb29yJTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D')]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent"></div>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <p className="text-sm font-semibold tracking-widest text-white">
          [SIGNATURE DOORS] [CRAFT COLLECTION]
        </p>
        <motion.h2
          variants={variants}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-3xl md:text-5xl font-black uppercase tracking-tighter text-white"
        >
          Your Next Door Starts Here
        </motion.h2>
        <motion.p
          variants={variants}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 max-w-2xl mx-auto text-white"
        >
          Classic woodwork reimagined for today’s homes.
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-center mt-8"
      >
        <Button href="/shop">DISCOVER THE CRAFT</Button>
      </motion.div>
    </section>
  );
}
