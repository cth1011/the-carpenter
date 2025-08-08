'use client'

import { types, Repeater } from 'react-bricks/rsc'
import { motion, easeIn } from 'motion/react'
import { useInView } from 'react-intersection-observer'

interface FeaturesClientProps {
  features: types.RepeaterItems
}

const FeaturesClient: React.FC<FeaturesClientProps> = ({ features }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeIn } },
  }

  return (
    <section className="bg-white py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-12 text-center"
      >
        <Repeater
          propName="features"
          items={features}
          renderItemWrapper={(item) => (
            <motion.div variants={itemVariants}>{item}</motion.div>
          )}
        />
      </motion.div>
    </section>
  )
}

export default FeaturesClient
