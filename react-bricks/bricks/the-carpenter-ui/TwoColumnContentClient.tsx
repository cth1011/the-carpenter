'use client'

import { motion } from 'motion/react'
import { easeIn } from 'motion'
import { useInView } from 'react-intersection-observer'
import { Repeater, Image, RichText, types } from 'react-bricks/rsc'

interface TwoColumnContentClientProps {
  title: types.TextValue
  text: types.TextValue
  image: types.IImageSource
  buttons: types.RepeaterItems
}

const TwoColumnContentClient: React.FC<TwoColumnContentClientProps> = ({
  title,
  text,
  image,
  buttons,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4, // Trigger when 10% of the component is visible
  })

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, easeIn, delay: 0.2 },
    },
  }

  return (
    <section
      ref={ref}
      className="bg-gray-100 py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={textVariants}
          className="text-center md:text-left"
        >
          <RichText
            value={title}
            propName="title"
            renderBlock={({ children }) => (
              <h2 className="text-4xl text-black md:text-6xl font-black uppercase tracking-tight leading-tight">
                {children}
              </h2>
            )}
            placeholder="Type a title..."
            allowedFeatures={[types.RichTextFeatures.Bold]}
          />
          <RichText
            propName="text"
            value={text}
            renderBlock={({ children }) => (
              <p className="mt-6 text-gray-600 max-w-md mx-auto md:mx-0">
                {children}
              </p>
            )}
            placeholder="Type a text..."
          />
          <div className="mt-8 flex justify-center md:justify-start">
            <Repeater propName="buttons" items={buttons} />
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={imageVariants}
          className="relative aspect-[4/5]"
        >
          <Image
            source={image}
            alt="Wooden doors"
            imageClassName="object-cover"
            propName="image"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default TwoColumnContentClient
