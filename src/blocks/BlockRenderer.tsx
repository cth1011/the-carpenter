import { Page } from '@/payload-types'
import PageHero from './PageHero'
import AboutTwoColumn from './AboutTwoColumn'
import Features from './Features'
import Faq from './Faq'
import ContactBlock from './ContactBlock'
import RichTextBlock from './RichTextBlock'

const blockComponents = {
  hero: PageHero,
  twoColumn: AboutTwoColumn,
  features: Features,
  faq: Faq,
  contact: ContactBlock,
  richText: RichTextBlock,
} as const

const BlockRenderer = ({ layout, pageTitle }: { layout: Page['layout']; pageTitle?: string }) => {
  if (!layout) {
    return null
  }

  return (
    <div>
      {layout.map((block, i) => {
        // @ts-ignore
        const BlockComponent = blockComponents[block.blockType]
        if (BlockComponent) {
          // @ts-ignore
          return <BlockComponent key={i} {...block} pageTitle={pageTitle} />
        }
        return null
      })}
    </div>
  )
}

export default BlockRenderer
