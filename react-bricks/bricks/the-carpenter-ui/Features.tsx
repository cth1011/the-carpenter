import { types } from 'react-bricks/rsc'
import FeaturesClient from './FeaturesClient'

interface FeaturesProps {
  features: types.RepeaterItems
}

const Features: types.Brick<FeaturesProps> = (props) => {
  return <FeaturesClient {...props} />
}

Features.schema = {
  name: 'features-carpenter',
  label: 'Features',
  category: 'carpenter-ui',
  getDefaultProps: () => ({
    features: [
      {
        icon: 'Hammer',
        title: 'Crafted by Skilled Artisans',
        description:
          'Every door is meticulously made by experienced craftsmen using time-tested techniques and premium wood — ensuring long-lasting beauty and structural integrity.',
      },
      {
        icon: 'Truck',
        title: 'Delivered Wherever You Build',
        description:
          'From cities to remote provinces, we ship across the Philippines with care and reliability — so your order arrives on time and in perfect condition.',
      },
      {
        icon: 'Ruler',
        title: 'Built for Your Vision',
        description:
          'Choose from a variety of styles, finishes, and sizes — or work with us to create custom doors that match your exact specifications.',
      },
    ],
  }),
  repeaterItems: [
    {
      name: 'features',
      itemType: 'feature-item-carpenter',
      itemLabel: 'Feature',
      min: 1,
      max: 3,
    },
  ],
}

export default Features
