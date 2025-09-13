interface ContactItemProps {
  text: string
  contactType?: 'text' | 'email' | 'tel'
}

const ContactItem: React.FC<ContactItemProps> = ({
  text,
  contactType = 'text',
}) => {
  return (
    <div>
      <div className="text-xs pt-1">
        {contactType === 'email' || contactType === 'tel' ? (
          <a
            href={contactType === 'email' ? `mailto:${text}` : `tel:${text}`}
            className={`${
              contactType === 'email' ? 'text-black' : ''
            } hover:text-black transition-colors cursor-pointer`}
            aria-label={contactType === 'email' ? `Email ${text}` : `Call ${text}`}
          >
            {text}
          </a>
        ) : (
          <>{text}</>
        )}
      </div>
    </div>
  )
}

export default ContactItem
