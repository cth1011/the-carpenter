import { getCachedPayload } from '@/payloadClient'
import ContactItem from './ContactItem'
import FooterNavSection from './FooterNavSection'
import FooterSocialLink from './FooterSocialLink'

export default async function Footer() {
  const payload = await getCachedPayload()
  const footer = await payload.findGlobal({
    slug: 'footer',
  })

  const {
    companyName,
    companyDescription,
    navSections,
    socialLinks,
    address,
    workHours,
    contacts,
  } = footer

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-black tracking-wide uppercase text-primary">
              {companyName}
            </h3>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              {companyDescription}
            </p>
            <div className="mt-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
                CONNECT WITH US
              </h4>
              <div className="flex space-x-4">
                {socialLinks?.map((socialLink, index) => (
                  <FooterSocialLink
                    key={index}
                    href={socialLink.href}
                    icon={socialLink.icon}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {navSections?.map((navSection, index) => (
              <FooterNavSection
                  key={index}
                title={navSection.title}
                navLinks={navSection.navLinks || []}
              />
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3">
                Address
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">{address}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3">
                Contacts
              </h4>
              <div className="space-y-2">
                {contacts?.map((contact, index) => (
                  <ContactItem
                    key={index}
                    text={contact.text}
                    contactType={contact.isEmail ? 'email' : 'tel'}
                  />
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3">
                Working Hours
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {workHours}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {companyName}. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
