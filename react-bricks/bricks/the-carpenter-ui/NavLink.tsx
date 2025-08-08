import React from 'react'
import { Text, Link, types } from 'react-bricks/rsc'

interface NavLinkProps {
  linkText: types.TextValue
  linkPath: string
  underlineColorClass?: string
  className?: string
  onLinkClick?: () => void
}
const NavLink: types.Brick<NavLinkProps> = ({
  linkPath,
  linkText,
  underlineColorClass,
  className,
  onLinkClick,
}) => (
  <Link
    href={linkPath}
    className={`group/link tracking-wider relative pb-1 text-sm font-medium transition-all opacity-100 group-hover:opacity-50 hover:!opacity-100 ${className}`}
    onClick={onLinkClick}
  >
    <Text
      propName="linkText"
      value={linkText}
      placeholder="Type a text..."
      renderBlock={({ children }) => <span>{children}</span>}
    />
    <span
      className={`absolute bottom-0 left-0 block h-px w-full max-w-0 transition-all duration-500 group-hover/link:max-w-full ${underlineColorClass}`}
    />
  </Link>
)

NavLink.schema = {
  name: 'navLink',
  label: 'Nav Link',
  category: 'carpenter-ui',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    linkText: 'Link',
    linkPath: '/',
  }),
  repeaterItems: [],
  sideEditProps: [
    {
      name: 'linkText',
      label: 'Link Text',
      type: types.SideEditPropType.Text,
    },
    {
      name: 'linkPath',
      label: 'Link Path',
      type: types.SideEditPropType.Text,
    },
  ],
}

export default NavLink
