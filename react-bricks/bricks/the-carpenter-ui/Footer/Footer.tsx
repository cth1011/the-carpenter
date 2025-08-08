import { Repeater, Text, types } from 'react-bricks/rsc'

interface FooterProps {
  companyName: types.TextValue
  companyDescription: types.TextValue
  navSections: types.RepeaterItems
  socialLinks: types.RepeaterItems
  address: types.TextValue
  workHours: types.TextValue
  contacts: types.RepeaterItems
}

const Footer: types.Brick<FooterProps> = ({
  companyName,
  companyDescription,
  navSections,
  socialLinks,
  address,
  contacts,
  workHours,
}) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-16">
          <div className="sm:w-1/4">
            <Text
              propName="companyName"
              value={companyName}
              placeholder="Company name"
              renderBlock={({ children }) => (
                <h3 className="text-xl font-black tracking-wide uppercase">
                  {children}
                </h3>
              )}
            />
            <Text
              propName="companyDescription"
              value={companyDescription}
              placeholder="Company description"
              renderBlock={({ children }) => (
                <p className="mt-2 text-sm text-gray-500">{children}</p>
              )}
            />
            <div className="pt-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider">
                CONNECT WITH US
              </h4>
              <div className="flex mt-4 space-x-4">
                <Repeater propName="socialLinks" items={socialLinks} />
              </div>
            </div>
          </div>

          <div className="sm:w-1/2 justify-center sm:border-x-1 sm:px-8 flex flex-col sm:flex-row gap-4 sm:gap-16">
            <Repeater propName="navSections" items={navSections} />
          </div>

          <div className="flex flex-col gap-2 sm:w-1/4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Address
            </h4>
            <Text
              propName="address"
              value={address}
              placeholder="Address"
              renderBlock={({ children }) => (
                <div className="text-xs pt-2 pb-4 text-gray-500">
                  {children}
                </div>
              )}
            />

            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Contacts
            </h4>
            <div className="flex flex-col text-xs pb-4 text-gray-500">
              <Repeater propName="contacts" items={contacts} />
            </div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Working Hours
            </h4>
            <Text
              propName="workHours"
              value={workHours}
              placeholder="workHours"
              renderBlock={({ children }) => (
                <div className="text-xs pt-2 pb-4 text-gray-500">
                  {children}
                </div>
              )}
            />
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} The Carpenter. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

Footer.schema = {
  name: 'footer',
  label: 'Footer',
  category: 'layout',
  repeaterItems: [
    {
      name: 'navSections',
      itemType: 'carpenter-footer-nav-section',
    },
    {
      name: 'socialLinks',
      itemType: 'carpenter-footer-social-link',
    },
    {
      name: 'contacts',
      itemType: 'carpenter-contact-item',
    },
  ],
  getDefaultProps: () => ({
    companyName: 'The Carpenter',
    companyDescription: 'Timeless Design. Lasting Strength.',
    workHours: 'Mon-Fri 08:00AM - 5:00PM',
    address:
      '242 Km. 15 MacArthur Highway Dalandanan, Valenzuela City, Metro Manila, Philippines',
    contacts: [
      { text: '+63 2 8292 3911' },
      { text: '+63 2 8292 3686' },
      { text: '+63 2 8292 9073' },
      { text: 'thecarpenterwood@yahoo.com', isEmail: true },
    ],
    navSections: [
      {
        title: 'Company',
        navLinks: [
          { linkText: 'Home', href: '/' },
          { linkText: 'Shop', href: '/shop' },
          { linkText: 'About Us', href: '/about' },
          { linkText: 'Contact Us', href: '/contact' },
        ],
      },
      {
        title: 'Shop',
        navLinks: [
          { linkText: 'All Doors', href: '/collections/all' },
          { linkText: 'Interior', href: '/collections/interior' },
          { linkText: 'Exterior', href: '/collections/exterior' },
        ],
      },
    ],
    socialLinks: [
      { href: '#', icon: 'facebook' },
      { href: '#', icon: 'instagram' },
      { href: '#', icon: 'twitter' },
    ],
  }),
}

export default Footer
