import React from 'react'
import { Repeater, Image, RichText, types } from 'react-bricks/rsc'

interface HeroProps {
  image: types.IImageSource
  title: types.TextValue
  text: types.TextValue
  buttons: types.RepeaterItems
}

const Hero: types.Brick<HeroProps> = ({ image, title, text, buttons }) => {
  return (
    <section className="relative h-[95vh] w-full">
      <Image
        source={image}
        propName="image"
        alt="Hero background"
        imageClassName="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center pb-20 px-4">
        <RichText
          value={title}
          propName="title"
          renderBlock={({ children }) => (
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
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
            <p className="mt-4 max-w-xl text-lg text-white">{children}</p>
          )}
          placeholder="Type a text..."
          allowedFeatures={[
            types.RichTextFeatures.Bold,
            types.RichTextFeatures.Italic,
          ]}
        />

        <Repeater
          propName="buttons"
          items={buttons}
          renderWrapper={(items) => (
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {items}
            </div>
          )}
        />
      </div>
    </section>
  )
}

Hero.schema = {
  name: 'hero',
  label: 'Hero Section',
  category: 'carpenter-ui',
  sideEditProps: [
    {
      name: 'image',
      label: 'Background Image',
      type: types.SideEditPropType.Image,
    },
  ],
  getDefaultProps: () => ({
    title: 'The Carpenter',
    text: 'Extraordinary wood doors, designed and built to last.',
    buttons: [
      {
        type: 'link',
        text: 'GET STARTED',
        href: '',
        isTargetBlank: false,
        buttonType: 'submit',
        variant: 'solid',
        padding: 'normal',
        simpleAnchorLink: false,
      },
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1606011082438-5e55fea65538?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      placeholderSrc:
        'https://images.unsplash.com/photo-1606011082438-5e55fea65538?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      srcSet: '',
      alt: 'A beautifully crafted wooden door.',
    },
  }),
  repeaterItems: [
    {
      name: 'buttons',
      itemType: 'button',
      itemLabel: 'Button',
      min: 0,
      max: 2,
    },
  ],
}

export default Hero
