import { types, Text } from 'react-bricks/rsc'
import { Hammer, Truck, Ruler } from 'lucide-react'

const iconMap = {
  Hammer: <Hammer className="h-8 w-8 mx-auto text-gray-400" />,
  Truck: <Truck className="h-8 w-8 mx-auto text-gray-400" />,
  Ruler: <Ruler className="h-8 w-8 mx-auto text-gray-400" />,
}

interface FeatureItemProps {
  icon: keyof typeof iconMap
  title: types.TextValue
  description: types.TextValue
}

const FeatureItem: types.Brick<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="text-center">
      <div className="mb-4">{iconMap[icon]}</div>
      <Text
        propName="title"
        value={title}
        placeholder="Feature Title"
        renderBlock={({ children }) => (
          <h3 className="text-sm font-bold uppercase tracking-wider">
            {children}
          </h3>
        )}
      />
      <Text
        propName="description"
        value={description}
        placeholder="Feature description..."
        renderBlock={({ children }) => (
          <p className="text-sm text-gray-600 mt-2">{children}</p>
        )}
      />
    </div>
  )
}

FeatureItem.schema = {
  name: 'feature-item-carpenter',
  label: 'Feature Item',
  category: 'carpenter-ui',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    icon: 'Hammer',
    title: 'Crafted by Skilled Artisans',
    description:
      'Every door is meticulously made by experienced craftsmen using time-tested techniques and premium wood — ensuring long-lasting beauty and structural integrity.',
  }),
  sideEditProps: [
    {
      name: 'icon',
      label: 'Icon',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Radio,
        options: [
          { value: 'Hammer', label: 'Hammer' },
          { value: 'Truck', label: 'Truck' },
          { value: 'Ruler', label: 'Ruler' },
        ],
      },
    },
  ],
}

export default FeatureItem
