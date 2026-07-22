import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { CartItem, Product } from '@/types'
import { analytics } from '@/utils/analytics'

interface CartState {
  items: CartItem[]
  coupon: string
  discount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON'; code: string }
  | { type: 'REMOVE_COUPON' }

interface CartContextValue extends CartState {
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string) => void
  removeCoupon: () => void
  itemCount: number
  subtotal: number
  deliveryCharge: number
  totalDiscount: number
  grandTotal: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.product.id === action.product.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.quantity || 1) }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: action.quantity || 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.product.id !== action.productId) }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.product.id !== action.productId) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [], coupon: '', discount: 0 }
    case 'APPLY_COUPON': {
      const discount = action.code === 'URBAN10' ? 10 : action.code === 'URBAN20' ? 20 : 0
      return { ...state, coupon: action.code, discount }
    }
    case 'REMOVE_COUPON':
      return { ...state, coupon: '', discount: 0 }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], coupon: '', discount: 0 })

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', product, quantity })
    analytics.addToCart(product.id, product.name, product.price, quantity)
  }

  const removeItem = (productId: string) => {
    const item = state.items.find(i => i.product.id === productId)
    if (item) {
      analytics.removeFromCart(productId, item.product.name, item.product.price, item.quantity)
    }
    dispatch({ type: 'REMOVE_ITEM', productId })
  }

  const updateQuantity = (productId: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', productId, quantity })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  const applyCoupon = (code: string) => dispatch({ type: 'APPLY_COUPON', code })
  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' })

  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * (1 - i.product.discount / 100) * i.quantity, 0)
  const deliveryCharge = subtotal > 50 ? 0 : 5.99
  const totalDiscount = subtotal * (state.discount / 100)
  const grandTotal = subtotal - totalDiscount + deliveryCharge

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        itemCount: state.items.reduce((sum, i) => sum + i.quantity, 0),
        subtotal,
        deliveryCharge,
        totalDiscount,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
