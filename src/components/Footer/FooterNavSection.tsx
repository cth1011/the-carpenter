import FooterNavLink from './FooterNavLink'

interface NavLink {
  linkText: string
  href: string
}

interface FooterNavSectionProps {
  title: string
  navLinks: NavLink[]
}

const FooterNavSection: React.FC<FooterNavSectionProps> = ({
  title,
  navLinks,
}) => {
  return (
    <div className="min-w-0 flex-1">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
        {title}
      </h4>
      <ul className="mt-4 space-y-3">
        {navLinks.map((navLink, index) => (
          <FooterNavLink
            key={index}
            linkText={navLink.linkText}
            href={navLink.href}
          />
        ))}
      </ul>
    </div>
  )
}

export default FooterNavSection
