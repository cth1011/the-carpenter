import { types } from 'react-bricks/rsc'
import TwoColumnContentClient from './TwoColumnContentClient'

interface TwoColumnContentProps {
  title: types.TextValue
  text: types.TextValue
  image: types.IImageSource
  buttons: types.RepeaterItems
}

const TwoColumnContent: types.Brick<TwoColumnContentProps> = (props) => {
  return <TwoColumnContentClient {...props} />
}

TwoColumnContent.schema = {
  name: 'two-column-content',
  label: 'Two Column Content',
  category: 'carpenter-ui',
  getDefaultProps: () => ({
    title: 'HALF A CENTURY OF CRAFT',
    text: 'For over five decades, The Carpenter has built a legacy of excellence in woodworking—shaping homes with doors that stand the test of time. Each piece we craft is rooted in traditional techniques, refined through years of experience, and made with a deep respect for the natural beauty of wood. We honor the past not by standing still, but by continuously raising the standard for quality, design, and durability in every door we deliver.',
    buttons: [
      {
        type: 'link',
        text: 'Learn More',
        href: '',
        isTargetBlank: false,
        buttonType: 'submit',
        variant: 'solid',
        padding: 'normal',
        simpleAnchorLink: false,
      },
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1682450195449-32ab08ddf7e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29vZCUyMGNhcnBlbnRlciUyMGRvb3JzfGVufDB8fDB8fHww',
      placeholderSrc:
        'https://images.unsplash.com/photo-1682450195449-32ab08ddf7e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29vZCUyMGNhcnBlbnRlciUyMGRvb3JzfGVufDB8fDB8fHww',
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
  sideEditProps: [
    {
      name: 'image',
      label: 'Background Image',
      type: types.SideEditPropType.Image,
    },
  ],
}

export default TwoColumnContent
