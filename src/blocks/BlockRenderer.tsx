import { Page } from '@/payload-types'
import AboutHero from './AboutHero'
import AboutTwoColumn from './AboutTwoColumn'
import Features from './Features'

const blockComponents = {
  hero: AboutHero,
  twoColumn: AboutTwoColumn,
  features: Features,
} as const

const BlockRenderer = ({ layout }: { layout: Page['layout'] }) => {
  if (!layout) {
    return null
  }

  return (
    <div>
      {layout.map((block, i) => {
        // @ts-ignore
        const BlockComponent = blockComponents[block.blockType]
        if (BlockComponent) {
          return <BlockComponent key={i} {...block} />
        }
        return null
      })}
    </div>
  )
}

export default BlockRenderer
