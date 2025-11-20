import { RichText } from '@payloadcms/richtext-lexical/react'

type RichTextBlockProps = {
  content: any
}

const RichTextBlock: React.FC<RichTextBlockProps> = ({ content }) => {
  if (!content) {
    return null
  }

  return (
    <div className="prose lg:prose-xl mx-auto py-12 px-4">
      <RichText data={content} />
    </div>
  )
}

export default RichTextBlock
