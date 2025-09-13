import Link from 'next/link'
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

const FooterSocialLink: React.FC<FooterSocialLinkProps> = ({ href, icon }) => {
  const socialName = icon.charAt(0).toUpperCase() + icon.slice(1)
  return (
    <Link
      href={href}
      className="text-gray-500 hover:text-black"
      aria-label={`Visit our ${socialName} page`}
    >
      {icons[icon]}
    </Link>
  )
}

export default FooterSocialLink
