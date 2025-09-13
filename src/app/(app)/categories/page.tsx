import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 'interior',
    name: 'Interior Doors',
    description:
      'Elegant doors designed for your living spaces, bedrooms, and interior rooms.',
    features: [
      'Various styles and finishes',
      'Sound insulation',
      'Easy installation',
      'Custom sizing',
    ],
    image: '/interior-door.jpg',
  },
  {
    id: 'exterior',
    name: 'Exterior Doors',
    description:
      'Secure and beautiful entry doors that protect your home while making a statement.',
    features: [
      'Weather resistant',
      'Security features',
      'Energy efficient',
      'Durable materials',
    ],
    image: '/exterior-door.jpg',
  },
  {
    id: 'sliding',
    name: 'Sliding Doors',
    description:
      'Space-saving sliding solutions perfect for modern homes and tight spaces.',
    features: [
      'Space efficient',
      'Smooth operation',
      'Modern design',
      'Versatile applications',
    ],
    image: '/sliding-door.jpg',
  },
  {
    id: 'french',
    name: 'French Doors',
    description:
      'Classic French door elegance that brings sophistication to any room.',
    features: [
      'Timeless design',
      'Natural light',
      'Elegant hardware',
      'Custom glass options',
    ],
    image: '/french-door.jpg',
  },
  {
    id: 'barn',
    name: 'Barn Doors',
    description:
      'Rustic charm meets modern functionality with our barn door collection.',
    features: [
      'Rustic aesthetic',
      'Space saving',
      'Unique hardware',
      'Custom finishes',
    ],
    image: '/barn-door.jpg',
  },
  {
    id: 'custom',
    name: 'Custom Doors',
    description:
      'Bespoke designs tailored to your unique space and style preferences.',
    features: [
      'Personalized design',
      'Custom dimensions',
      'Unique materials',
      'Expert consultation',
    ],
    image: '/custom-door.jpg',
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Door Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of doors, each category
            designed to meet specific needs and preferences. From interior
            elegance to exterior security, we have the perfect door for every
            space.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 bg-gradient-to-br from-amber-200 to-orange-300">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center px-4">
                    {category.name}
                  </h3>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{category.name}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-6">{category.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {category.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <span className="text-amber-600 mr-2 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/products?category=${category.id}`}>
                  <div className="flex items-center justify-between p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors duration-200 cursor-pointer">
                    <span className="font-medium text-amber-700">
                      View Products
                    </span>
                    <ArrowRight className="h-4 w-4 text-amber-700" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-xl text-amber-100 mb-6">
                We specialize in custom doors tailored to your specific needs
                and preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <div className="inline-flex items-center px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    Get Custom Quote
                  </div>
                </Link>
                <Link href="/products">
                  <div className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-amber-600 transition-colors duration-200">
                    Browse All Products
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
