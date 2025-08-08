import { Text, Link, types } from 'react-bricks/rsc'

interface FooterNavLinkProps {
  linkText: types.TextValue
  href: string
}

const FooterNavLink: types.Brick<FooterNavLinkProps> = ({ linkText, href }) => {
  return (
    <li>
      <Link
        href={href}
        className="group/link relative pb-1 text-sm text-gray-500 hover:text-black transition-colors"
      >
        <Text
          propName="linkText"
          value={linkText}
          placeholder="Link text"
          renderBlock={({ children }) => <>{children}</>}
        />
        <span className="absolute bottom-0 left-0 block h-px w-full max-w-0 transition-all duration-400 group-hover/link:max-w-full bg-black" />
      </Link>
    </li>
  )
}

FooterNavLink.schema = {
  name: 'carpenter-footer-nav-link',
  label: 'Nav Link',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    linkText: 'Home',
    href: '/',
  }),
  sideEditProps: [
    {
      name: 'href',
      label: 'Link to...',
      type: types.SideEditPropType.Text,
    },
  ],
}

export default FooterNavLink
