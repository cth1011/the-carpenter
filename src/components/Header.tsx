import { getCachedPayload } from '@/payloadClient'
import config from '@/payload.config'
import HeaderClient from './HeaderClient'

export default async function Header() {
  const payload = await getCachedPayload()
  const header = await payload.findGlobal({
    slug: 'header',
  })

  return <HeaderClient header={header} />
}
