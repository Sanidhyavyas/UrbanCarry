import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product } from '@/types'
import { useCart } from './CartContext'

interface WishlistContextValue {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  moveToCart: (productId: string) => void
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const { addItem: addToCart } = useCart()

  const addItem = (product: Product) => {
    setItems(prev => prev.some(p => p.id === product.id) ? prev : [...prev, product])
  }

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(p => p.id !== productId))
  }

  const isInWishlist = (productId: string) => items.some(p => p.id === productId)

  const moveToCart = (productId: string) => {
    const product = items.find(p => p.id === productId)
    if (product) {
      addToCart(product)
      removeItem(productId)
    }
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, moveToCart }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
