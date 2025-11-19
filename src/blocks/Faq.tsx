'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import type { Faq as FaqType } from '@/payload-types'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { easeIn } from 'motion'

interface FaqItem {
  id?: string | null
  question: string
  answer: string
}

export interface FaqProps extends Omit<FaqType, 'id' | 'blockType' | 'blockName'> {
  blockType: 'faq'
  blockName?: string
  title?: string
  faqs?: FaqItem[]
}

const Faq: React.FC<FaqProps> = ({
  title = 'Frequently Asked Questions',
  faqs = [],
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeIn },
    },
  }

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-wide">
          {title}
        </h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div key={faq.id || index} variants={itemVariants}>
              <Collapsible className="border-b">
                <CollapsibleTrigger className="flex justify-between items-center w-full py-4 text-left font-semibold text-lg">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden pt-2 pb-4 text-gray-700 prose data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                  {faq.answer}
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Faq
