import { Media } from '@/payload-types'
import Image from 'next/image'

interface AboutTwoColumnProps {
  title?: string
  text?: string
  image?: Media
  imagePosition?: 'left' | 'right'
  backgroundColor?: 'white' | 'light-gray' | 'dark-green'
}

const defaultImage: Media = {
  id: 0,
  alt: 'A beautifully crafted wooden door.',
  url: 'https://images.unsplash.com/photo-1682450195449-32ab08ddf7e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29vZCUyMGNhcnBlbnRlciUyMGRvb3JzfGVufDB8fDB8fHww',
  createdAt: '',
  updatedAt: '',
  filename: 'default-image.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  width: 500,
  height: 500,
}

const AboutTwoColumn: React.FC<AboutTwoColumnProps> = ({
  title = 'OUR STORY',
  text = 'Founded over five decades ago, The Carpenter has been at the forefront of the Philippine woodworking industry. As part of Extensive Wood, we combine time-honored craftsmanship with modern manufacturing technology to produce premium-quality wooden doors and wood products. From a modest workshop to a fully integrated, multi-hectare facility in Valenzuela City, we have built our reputation on quality, innovation, and a commitment to customer satisfaction.',
  image = defaultImage,
  imagePosition = 'right',
  backgroundColor = 'light-gray',
}) => {
  const bgColorClasses = {
    white: 'bg-white',
    'light-gray': 'bg-gray-100',
    'dark-green': 'bg-[#234537]',
  }
  return (
    <section className={bgColorClasses[backgroundColor]}>
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        <div
          className={`text-center md:text-left px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col justify-center ${
            imagePosition === 'left' ? 'md:order-last' : ''
          }`}
        >
          <h2 className="text-2xl font-black uppercase tracking-wide leading-tight">
            {title}
          </h2>
          <p className="mt-6 text-gray-600 max-w-md mx-auto md:mx-0">{text}</p>
        </div>

        <div
          className={`relative min-h-[400px] md:min-h-[600px] ${
            imagePosition === 'left' ? 'md:order-first' : ''
          }`}
        >
          <Image
            src={image?.url || ''}
            alt={image?.alt || 'Image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutTwoColumn
