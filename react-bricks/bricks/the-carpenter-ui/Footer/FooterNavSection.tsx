import { Repeater, Text, types } from 'react-bricks/rsc'

interface FooterNavSectionProps {
  title: types.TextValue
  navLinks: types.RepeaterItems
}

const FooterNavSection: types.Brick<FooterNavSectionProps> = ({
  title,
  navLinks,
}) => {
  return (
    <div>
      <Text
        propName="title"
        value={title}
        placeholder="Title"
        renderBlock={({ children }) => (
          <h4 className="text-sm font-semibold uppercase tracking-wider">
            {children}
          </h4>
        )}
      />
      <ul className="mt-4 space-y-2">
        <Repeater propName="navLinks" items={navLinks} />
      </ul>
    </div>
  )
}

FooterNavSection.schema = {
  name: 'carpenter-footer-nav-section',
  label: 'Nav Section',
  hideFromAddMenu: true,
  repeaterItems: [
    {
      name: 'navLinks',
      itemType: 'carpenter-footer-nav-link',
    },
  ],
  getDefaultProps: () => ({
    title: 'Company',
    navLinks: [
      { linkText: 'Home', href: '/' },
      { linkText: 'Shop', href: '/shop' },
      { linkText: 'About Us', href: '/about' },
      { linkText: 'Contact Us', href: '/contact' },
    ],
  }),
}

export default FooterNavSection
