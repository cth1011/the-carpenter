import { Link, types } from 'react-bricks/rsc'
import { Facebook, Instagram, Twitter } from 'lucide-react'

interface FooterSocialLinkProps {
  href: string
  icon: 'facebook' | 'instagram' | 'twitter'
}

const icons = {
  facebook: <Facebook size={20} />,
  instagram: <Instagram size={20} />,
  twitter: <Twitter size={20} />,
}

const FooterSocialLink: types.Brick<FooterSocialLinkProps> = ({ href, icon }) => {
  return (
    <Link href={href} className="text-gray-500 hover:text-black">
      {icons[icon]}
    </Link>
  )
}

FooterSocialLink.schema = {
  name: 'carpenter-footer-social-link',
  label: 'Social Link',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    href: '#',
    icon: 'facebook',
  }),
  sideEditProps: [
    {
      name: 'href',
      label: 'Link to...',
      type: types.SideEditPropType.Text,
    },
    {
      name: 'icon',
      label: 'Icon',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Radio,
        options: [
          { value: 'facebook', label: 'Facebook' },
          { value: 'instagram', label: 'Instagram' },
          { value: 'twitter', label: 'Twitter' },
        ],
      },
    },
  ],
}

export default FooterSocialLink