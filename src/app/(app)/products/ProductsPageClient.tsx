'use client'

import { useState, useEffect, useCallback } from 'react'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Filter, Grid, List } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { usePagination, DOTS } from '@/hooks/usePagination'
import { Product, Category } from '@/payload-types'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ProductsPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)
  const pageSize = 12

  const currentPage = Number(searchParams.get('page')) || 1
  const searchTerm = searchParams.get('search') || ''
  const selectedCategory = searchParams.get('category') || 'all'

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: pageSize.toString(),
        depth: '2',
      })
      if (selectedCategory && selectedCategory !== 'all') {
        params.set('category', selectedCategory)
      }
      if (searchTerm) {
        params.set('search', searchTerm)
      }

      const response = await fetch(`/api/public/products?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.docs || [])
        setTotalPages(data.totalPages)
        setTotalDocs(data.totalDocs)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, selectedCategory, searchTerm])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories?limit=100')
        if (response.ok) {
          const data = await response.json()
          setCategories(data.docs || [])
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setCategoriesLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.replace(`?${params.toString()}`)
  }

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('category', category)
    params.set('page', '1')
    router.replace(`?${params.toString()}`)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        if (localSearchTerm.length === 0 || localSearchTerm.length >= 3) {
          const params = new URLSearchParams(searchParams)
          if (localSearchTerm) {
            params.set('search', localSearchTerm)
          } else {
            params.delete('search')
          }
          params.set('page', '1')
          router.replace(`?${params.toString()}`)
        }
      }
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [localSearchTerm, searchTerm, router, searchParams])

  const clearFilters = () => {
    setLocalSearchTerm('')
    const params = new URLSearchParams(searchParams)
    params.delete('search')
    params.delete('category')
    params.set('page', '1')
    router.replace(`?${params.toString()}`)
  }

  const paginationRange = usePagination({
    currentPage,
    totalCount: totalDocs,
    siblingCount: 1,
    pageSize,
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">


        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 md:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search doors..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={categoriesLoading || loading}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-gray-500 text-sm h-5 flex items-center">
              {loading ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                <>
                  {totalDocs} {totalDocs === 1 ? 'product' : 'products'}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {loading ? (
            Array.from({ length: pageSize }).map((_, i) => (
              <div
                key={i}
                className="bg-white overflow-hidden border border-gray-200"
              >
                <Skeleton className="aspect-[3/4] w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : products.length === 0 ? (
            <div className="col-span-full">
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-600 text-lg">
                    No products found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`?page=${currentPage - 1}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage - 1)
                    }}
                    className={
                      currentPage === 1
                        ? 'pointer-events-none opacity-50'
                        : undefined
                    }
                  />
                </PaginationItem>
                {paginationRange.map((pageNumber, index) => {
                  if (pageNumber === DOTS) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }

                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href={`?page=${pageNumber}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(pageNumber as number)
                        }}
                        isActive={pageNumber === currentPage}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}
                <PaginationItem>
                  <PaginationNext
                    href={`?page=${currentPage + 1}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage + 1)
                    }}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : undefined
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}
