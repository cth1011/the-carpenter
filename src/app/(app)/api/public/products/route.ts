import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

declare global {
  var payload: any
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({
      config,
    })

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let query: any = {
      page,
      limit,
      depth: 2,
    }

    // Add category filter if provided
    if (category && category !== 'all') {
      query.where = {
        ...query.where,
        category: {
          equals: category,
        },
      }
    }

    // Add search filter if provided
    if (search) {
      query.where = {
        ...query.where,
        or: [
          {
            name: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      }
    }

    const products = await payload.find({
      collection: 'products',
      ...query,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
