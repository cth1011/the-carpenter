import React from 'react'
import { Image, RichText, types } from 'react-bricks/rsc'

interface AboutHeroProps {
  image: types.IImageSource
  title: types.TextValue
  text: types.TextValue
  buttons: types.RepeaterItems
}

const AboutHero: types.Brick<AboutHeroProps> = ({
  image,
  title,
  text,
  buttons,
}) => {
  return (
    <section className="relative h-[20vh] md:h-[40vh] w-full">
      <Image
        source={image}
        propName="image"
        alt="Hero background"
        imageClassName="absolute inset-0 w-full h-full object-fill"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/45"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center pb-20 px-4">
        <RichText
          value={title}
          propName="title"
          renderBlock={({ children }) => (
            <h1 className="text-2xl md:text-6xl font-bold tracking-wider">
              {children}
            </h1>
          )}
          allowedFeatures={[types.RichTextFeatures.Bold]}
          placeholder="Type a title..."
        />
        <RichText
          value={text}
          propName="text"
          renderBlock={({ children }) => (
            <p className="mt-4 max-w-xl text-base tracking-wide text-white">
              {children}
            </p>
          )}
          placeholder="Type a text..."
          allowedFeatures={[
            types.RichTextFeatures.Bold,
            types.RichTextFeatures.Italic,
          ]}
        />
      </div>
    </section>
  )
}

AboutHero.schema = {
  name: 'about-hero',
  label: 'About Hero',
  category: 'carpenter-ui',
  sideEditProps: [
    {
      name: 'image',
      label: 'Background Image',
      type: types.SideEditPropType.Image,
    },
  ],
  getDefaultProps: () => ({
    title: 'THE CARPENTER',
    text: 'SINCE 1950',
    image: {
      src: 'https://images.unsplash.com/photo-1606011082438-5e55fea65538?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      placeholderSrc:
        'https://images.unsplash.com/photo-1606011082438-5e55fea65538?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      srcSet: '',
      alt: 'A beautifully crafted wooden door.',
    },
  }),
}

export default AboutHero
