'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus, Minus, Send, ShoppingCart } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import { useQuotationStore } from '@/store/quotation'
import { toast } from 'sonner'

export default function QuotationPage() {
  const {
    items,
    removeFromQuotation,
    updateQuantity,
    clearQuotation,
    getItemCount,
  } = useQuotationStore()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      items,
      customerInfo: formData,
    }

    try {
      const response = await fetch('/api/quotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to send quotation')
      }

      toast.success('Quotation request sent!', {
        description: 'We’ll contact you within 1–2 business days.',
      })

      clearQuotation()
      setFormData({ name: '', email: '', phone: '', address: '', message: '' })
    } catch (error) {
      toast.error('Something went wrong.', {
        description: 'Please try again later.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/10 px-4">
        <Card className="text-center py-12 max-w-md mx-auto">
          <CardContent>
            <ShoppingCart className="h-14 w-14 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Your Quotation is Empty
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Browse our collection and start building your quotation.
            </p>
            <Link href="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* HEADER with Breadcrumbs */}
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Quotation</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-semibold text-foreground pt-8 md:pt-16">
          Request a Quotation
        </h1>
      </div>

      {/* MAIN CARD */}
      <Card className="shadow-sm border-muted">
        <div className="grid md:grid-cols-2">
          {/* LEFT: ITEMS */}
          <div className="p-6 border-b md:border-b-0 md:border-r border-muted">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Selected Items ({getItemCount()})
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearQuotation}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            </div>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartId}
                  className="flex flex-col sm:flex-row justify-between sm:items-center border rounded-xl p-4 bg-muted/30"
                >
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={
                          (typeof item.product.productImages?.[0]?.image ===
                            'object' &&
                            (item.product.productImages[0].image as any).url) ||
                          '/placeholder-door.svg'
                        }
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.selectedDimensions.width && (
                          <>W: {item.selectedDimensions.width} </>
                        )}
                        {item.selectedDimensions.height && (
                          <>H: {item.selectedDimensions.height} </>
                        )}
                        {item.selectedDimensions.thickness && (
                          <>T: {item.selectedDimensions.thickness}</>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item.cartId, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item.cartId, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFromQuotation(item.cartId)}
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Submit Your Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Full Name *"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address *"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <Textarea
                name="address"
                placeholder="Address"
                className="resize-none"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Textarea
                name="message"
                placeholder="Tell us about your project, timeline, or requirements..."
                className="resize-none"
                value={formData.message}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="text-center py-6 px-4 w-full uppercase text-xs font-semibold tracking-wider border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-500 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Quotation Request'}
              </button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  )
}
