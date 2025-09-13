import Link from 'next/link'

interface FooterNavLinkProps {
  linkText: string
  href: string
}

const FooterNavLink: React.FC<FooterNavLinkProps> = ({ linkText, href }) => {
  return (
    <li className="whitespace-nowrap">
      <Link
        href={href}
        className="group/link relative inline-block pb-1 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
      >
        {linkText}
        <span className="absolute bottom-0 left-0 block h-px w-full max-w-0 transition-all duration-300 ease-out group-hover/link:max-w-full bg-gray-900" />
      </Link>
    </li>
  )
}

export default FooterNavLink
