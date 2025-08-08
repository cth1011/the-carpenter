import { types } from 'react-bricks/rsc'
import HeaderClient from './HeaderClient'

// Props interface for the server component
interface HeaderProps {
  logo: types.IImageSource
  logoText: types.TextValue
  navLinks: types.RepeaterItems
}

const Header: types.Brick<HeaderProps> = (props) => {
  return <HeaderClient {...props} />
}

Header.schema = {
  name: 'header',
  label: 'Header',
  category: 'carpenter-ui',
  getDefaultProps: () => ({
    logoText: 'The Carpenter',
    navLinks: [
      {
        text: 'Shop',
        link: '/shop',
      },
      {
        text: 'About Us',
        link: '/about',
      },
      {
        text: 'Contact Us',
        link: '/contact',
      },
    ],
  }),

  repeaterItems: [
    {
      name: 'navLinks',
      itemType: 'navLink',
      itemLabel: 'Nav Link',
      min: 0,
      max: 4,
    },
  ],
}

export default Header
