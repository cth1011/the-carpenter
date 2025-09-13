import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product } from '@/payload-types'

type SelectedDimensions = {
  thickness?: string
  width?: string
  height?: string
}

export type QuotationItem = {
  product: Product
  selectedDimensions: SelectedDimensions
  quantity: number
  cartId: string
}

interface QuotationState {
  items: QuotationItem[]
  isLoaded: boolean
  addToQuotation: (
    product: Product,
    selectedDimensions: SelectedDimensions,
    quantity?: number,
  ) => void
  removeFromQuotation: (cartId: string) => void
  updateQuantity: (cartId: string, quantity: number) => void
  clearQuotation: () => void
  getItemCount: () => number
  setLoaded: (isLoaded: boolean) => void
}

const generateCartId = (productId: number, dimensions: SelectedDimensions) => {
  const { thickness = '', width = '', height = '' } = dimensions
  return `${productId}-${thickness}-${width}-${height}`
}

export const useQuotationStore = create<QuotationState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoaded: false,
      setLoaded: isLoaded => set({ isLoaded }),
      addToQuotation: (product, selectedDimensions, quantity = 1) => {
        const { items } = get()
        const cartId = generateCartId(product.id, selectedDimensions)
        const existingItem = items.find(item => item.cartId === cartId)

        if (existingItem) {
          set({
            items: items.map(item =>
              item.cartId === cartId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          })
        } else {
          const newItem: QuotationItem = {
            product,
            selectedDimensions,
            quantity,
            cartId,
          }
          set({ items: [...items, newItem] })
        }
      },
      removeFromQuotation: cartId => {
        set({ items: get().items.filter(item => item.cartId !== cartId) })
      },
      updateQuantity: (cartId, quantity) => {
        if (quantity <= 0) {
          get().removeFromQuotation(cartId)
          return
        }
        set({
          items: get().items.map(item =>
            item.cartId === cartId ? { ...item, quantity } : item,
          ),
        })
      },
      clearQuotation: () => {
        set({ items: [] })
      },
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'carpenter-quotation',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          state.setLoaded(true)
        }
      },
    },
  ),
)
