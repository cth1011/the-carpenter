'use client'

import { motion } from 'motion/react'
import { easeIn } from 'motion'
import { useInView } from 'react-intersection-observer'
import { Hammer, Truck, Ruler } from 'lucide-react'

interface Feature {
  icon: 'Hammer' | 'Truck' | 'Ruler'
  title: string
  description: string
}

interface FeaturesProps {
  features?: Feature[]
  disableAnimation?: boolean
}

const iconMap = {
  Hammer: <Hammer className="h-8 w-8 mx-auto text-gray-400" />,
  Truck: <Truck className="h-8 w-8 mx-auto text-gray-400" />,
  Ruler: <Ruler className="h-8 w-8 mx-auto text-gray-400" />,
}

const Features: React.FC<FeaturesProps> = ({
  features = [
    {
      icon: 'Hammer',
      title: 'Crafted by Skilled Artisans',
      description:
        'Every door is meticulously made by experienced craftsmen using time-tested techniques and premium wood — ensuring long-lasting beauty and structural integrity.',
    },
    {
      icon: 'Truck',
      title: 'Delivered Wherever You Build',
      description:
        'From cities to remote provinces, we ship across the Philippines with care and reliability — so your order arrives on time and in perfect condition.',
    },
    {
      icon: 'Ruler',
      title: 'Built for Your Vision',
      description:
        'Choose from a variety of styles, finishes, and sizes — or work with us to create custom doors that match your exact specifications.',
    },
  ],
}) => {
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
    <section className="bg-white mx-auto max-w-screen-xl py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-12 text-center"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants}>
            <div className="text-center">
              <div className="mb-4">{iconMap[feature.icon]}</div>
              <h3 className="text-sm font-bold uppercase tracking-wider">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Features
