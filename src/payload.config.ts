import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Products } from './collections/Products'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { LandingPage, Header, Footer } from './globals'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      url: 'http://localhost:3000',
      globals: ['landing-page', 'header', 'footer'],
    },
  },
  collections: [Users, Posts, Products, Media, Pages, Categories],
  globals: [LandingPage, Header, Footer],
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      clientUploads: true,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
})