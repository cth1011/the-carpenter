import { types, RichText, Image } from 'react-bricks/rsc'

// Custom color palette for this component
const aboutBgColors = {
  WHITE: {
    label: 'White',
    value: { color: '#ffffff', className: 'bg-white' },
  },
  LIGHT_GRAY: {
    label: 'Light Gray',
    value: { color: '#f3f4f6', className: 'bg-gray-100' },
  },
  CUSTOM_GREEN: {
    label: 'Dark Green',
    value: { color: '#234537', className: 'bg-[#234537]' },
  },
}

interface AboutTwoColumnProps {
  title: types.TextValue
  text: types.TextValue
  image: types.IImageSource
  imagePosition: 'left' | 'right'
  backgroundColor: types.IColor
}

const AboutTwoColumn: types.Brick<AboutTwoColumnProps> = ({
  title,
  text,
  image,
  imagePosition,
  backgroundColor = aboutBgColors.LIGHT_GRAY.value,
}) => {
  return (
    <section className={backgroundColor.className}>
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div
          className={`text-center md:text-left px-4 sm:px-6 lg:px-8 py-16 md:py-20 ${
            imagePosition === 'left' ? 'md:order-last' : ''
          }`}
        >
          <RichText
            value={title}
            propName="title"
            renderBlock={({ children }) => (
              <h2 className="text-2xl font-black uppercase tracking-wide leading-tight">
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
        </div>

        <div className={imagePosition === 'left' ? 'md:order-first' : ''}>
          <Image
            source={image}
            alt="Wooden doors"
            imageClassName="object-cover w-full h-full"
            propName="image"
          />
        </div>
      </div>
    </section>
  )
}

AboutTwoColumn.schema = {
  name: 'about-two-column',
  label: 'About Two Column',
  category: 'carpenter-ui',
  getDefaultProps: () => ({
    title: 'OUR STORY',
    text: 'Founded over five decades ago, The Carpenter has been at the forefront of the Philippine woodworking industry. As part of Extensive Wood, we combine time-honored craftsmanship with modern manufacturing technology to produce premium-quality wooden doors and wood products. From a modest workshop to a fully integrated, multi-hectare facility in Valenzuela City, we have built our reputation on quality, innovation, and a commitment to customer satisfaction.',
    imagePosition: 'right',
    backgroundColor: aboutBgColors.LIGHT_GRAY.value,
    image: {
      src: 'https://images.unsplash.com/photo-1682450195449-32ab08ddf7e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29vZCUyMGNhcnBlbnRlciUyMGRvb3JzfGVufDB8fDB8fHww',
      placeholderSrc:
        'https://images.unsplash.com/photo-1682450195449-32ab08ddf7e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29vZCUyMGNhcnBlbnRlciUyMGRvb3JzfGVufDB8fDB8fHww',
      srcSet: '',
      alt: 'A beautifully crafted wooden door.',
    },
  }),
  sideEditProps: [
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Color,
        options: Object.values(aboutBgColors),
      },
    },
    {
      name: 'imagePosition',
      label: 'Image Position',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Radio,
        options: [
          { value: 'left', label: 'Left' },
          { value: 'right', label: 'Right' },
        ],
      },
    },
    {
      name: 'image',
      label: 'Image',
      type: types.SideEditPropType.Image,
    },
  ],
}

export default AboutTwoColumn
