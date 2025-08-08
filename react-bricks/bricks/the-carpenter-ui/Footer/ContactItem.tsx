import { Text, types } from 'react-bricks/rsc'

interface ContactItemProps {
  text: types.TextValue
  contactType?: 'text' | 'email' | 'tel'
}

const ContactItem: types.Brick<ContactItemProps> = ({
  text,
  contactType,
}) => {
  const textValue = typeof text === 'string' ? text : text[0]?.children[0]?.text

  const renderContent = () => {
    const sharedClasses = 'hover:text-black transition-colors cursor-pointer'
    switch (contactType) {
      case 'email':
        return (
          <a href={`mailto:${textValue}`} className={sharedClasses}>
            {textValue}
          </a>
        )
      case 'tel':
        return (
          <a href={`tel:${textValue}`} className={sharedClasses}>
            {textValue}
          </a>
        )
      default:
        return <>{textValue}</>
    }
  }

  return (
    <div>
      <Text
        propName="text"
        value={text}
        placeholder="Contact info"
        renderBlock={({ children }) => (
          <div className="text-xs pb-2 min-w-[200px]">
            {contactType === 'email' || contactType === 'tel' ? (
              <a
                href={
                  contactType === 'email'
                    ? `mailto:${textValue}`
                    : `tel:${textValue}`
                }
                className="hover:text-black transition-colors cursor-pointer"
              >
                {children}
              </a>
            ) : (
              <>{children}</>
            )}
          </div>
        )}
      />
    </div>
  )
}

ContactItem.schema = {
  name: 'carpenter-contact-item',
  label: 'Contact Item',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    text: '+63 2 8292 3911',
    contactType: 'text',
  }),
  sideEditProps: [
    {
      name: 'contactType',
      label: 'Contact Type',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Radio,
        options: [
          { value: 'text', label: 'Text' },
          { value: 'email', label: 'Email' },
          { value: 'tel', label: 'Telephone' },
        ],
      },
    },
  ],
}

export default ContactItem