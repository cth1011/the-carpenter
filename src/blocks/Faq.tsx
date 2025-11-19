'use client'

import { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { easeIn, easeInOut } from 'motion'

interface FaqItem {
  id?: string | null
  question: string
  answer: string
}

export interface FaqProps {
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
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({})

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
              <Collapsible
                className="border-b"
                open={openItems[index]}
                onOpenChange={(isOpen) =>
                  setOpenItems((prev) => ({ ...prev, [index]: isOpen }))
                }
              >
                <CollapsibleTrigger className="flex justify-between items-center w-full py-4 text-left font-semibold text-lg">
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openItems[index] ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: easeInOut }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </CollapsibleTrigger>
                <AnimatePresence initial={false}>
                  {openItems[index] && (
                    <CollapsibleContent forceMount asChild>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.3, ease: easeInOut },
                            opacity: { duration: 0.25, ease: easeInOut },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: easeInOut },
                            opacity: { duration: 0.2, ease: easeInOut },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-4 text-gray-700 prose">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </CollapsibleContent>
                  )}
                </AnimatePresence>
              </Collapsible>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Faq
