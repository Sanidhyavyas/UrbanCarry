import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, ShoppingBag, ArrowLeft, Minus, Plus, X } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { formatPrice, calculateDiscount } from '@/lib/utils'

export default function Cart() {
  const {
    items,
    coupon,
    discount,
    subtotal,
    deliveryCharge,
    totalDiscount,
    grandTotal,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart()

  const handleApplyCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const code = (form.elements.namedItem('code') as HTMLInputElement).value
    applyCoupon(code)
  }

  if (items.length === 0) {
    return (
      <>
        <SEO title="Shopping Cart – UrbanCarry" description="Review your items and proceed to checkout." url="/cart" />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
          <p className="text-muted-foreground text-sm">Looks like you haven't added anything yet.</p>
          <Button asChild><Link to="/products">Start Shopping</Link></Button>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title="Shopping Cart – UrbanCarry" description="Review your items and proceed to checkout." url="/cart" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            <Trash2 className="w-4 h-4" /> Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-4">
            {items.map(item => {
              const price = calculateDiscount(item.product.price, item.product.discount)
              return (
                <motion.div
                  key={item.product.id}
                  layout
                  className="flex gap-4 p-4 rounded-2xl border border-border bg-card"
                >
                  <Link to={`/products/${item.product.id}`} className="w-24 h-24 rounded-xl overflow-hidden bg-muted shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.product.id}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-1">
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.product.brand}</p>
                    <p className="text-sm font-bold mt-1">{formatPrice(price)}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
                          aria-label="Decrease"
                        ><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
                          aria-label="Increase"
                        ><Plus className="w-3 h-3" /></button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                        aria-label="Remove item"
                      ><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">{deliveryCharge === 0 ? <span className="text-success">Free</span> : formatPrice(deliveryCharge)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Coupon ({coupon})</span>
                    <span>-{formatPrice(totalDiscount)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  name="code"
                  defaultValue={coupon}
                  placeholder={coupon ? 'Coupon applied' : 'Enter coupon'}
                  className="flex-1 h-10 px-3 rounded-lg border border-border text-sm focus:outline-none focus:border-primary"
                  aria-label="Coupon code"
                />
                {coupon ? (
                  <Button type="button" variant="outline" size="sm" onClick={removeCoupon}>
                    <X className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button type="submit" size="sm">Apply</Button>
                )}
              </form>
              <p className="text-[10px] text-muted-foreground">Try codes: URBAN10 (10% off), URBAN20 (20% off)</p>

              <Button size="lg" className="w-full" asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/products"><ArrowLeft className="w-4 h-4" /> Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
