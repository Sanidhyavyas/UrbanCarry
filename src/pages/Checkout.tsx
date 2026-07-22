import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, CreditCard, Package, Truck } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCart } from '@/context/CartContext'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { analytics } from '@/utils/analytics'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, deliveryCharge, discount, totalDiscount, grandTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [placed, setPlaced] = useState(false)

  if (items.length === 0 && !placed) {
    navigate('/cart')
    return null
  }

  const handlePlaceOrder = () => {
    analytics.beginCheckout(items.map(i => ({ id: i.product.id, name: i.product.name, price: calculateDiscount(i.product.price, i.product.discount), quantity: i.quantity })))
    const orderId = 'UC-' + Date.now().toString(36).toUpperCase()
    analytics.purchase(
      orderId,
      items.map(i => ({ id: i.product.id, name: i.product.name, price: calculateDiscount(i.product.price, i.product.discount), quantity: i.quantity })),
      grandTotal
    )
    clearCart()
    setPlaced(true)
    setStep(3)
  }

  if (placed) {
    return (
      <>
        <SEO title="Order Confirmed – UrbanCarry" description="Your order has been placed successfully." />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
          <p className="text-sm text-muted-foreground mb-8">Order ID: UC-{Date.now().toString(36).toUpperCase()}</p>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title="Checkout – UrbanCarry" description="Complete your purchase with secure checkout." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

        <div className="flex items-center gap-4 mb-10">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className={`text-sm font-medium ${step >= s ? 'text-foreground' : 'text-muted-foreground'}`}>
                {s === 1 ? 'Shipping' : 'Payment'}
              </span>
              {s < 2 && <div className="w-16 h-px bg-border ml-2" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h2 className="text-xl font-semibold">Shipping Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="First Name" id="fName" placeholder="John" required />
                  <Input label="Last Name" id="lName" placeholder="Doe" required />
                </div>
                <Input label="Email" id="email" type="email" placeholder="john@example.com" required />
                <Input label="Phone" id="phone" type="tel" placeholder="+1 (234) 567-890" required />
                <Input label="Address" id="address" placeholder="123 Main Street" required />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input label="City" id="city" placeholder="New York" required />
                  <Input label="State" id="state" placeholder="NY" required />
                  <Input label="ZIP Code" id="zip" placeholder="10001" required />
                </div>
                <Button size="lg" className="w-full mt-4" onClick={() => setStep(2)}>
                  Continue to Payment
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <h2 className="text-xl font-semibold">Payment Method</h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 rounded-xl border border-border has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer transition-colors">
                    <input type="radio" name="payment" defaultChecked className="accent-primary" />
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Credit Card</p>
                      <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-xl border border-border has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer transition-colors">
                    <input type="radio" name="payment" className="accent-primary" />
                    <Package className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Cash on Delivery</p>
                      <p className="text-xs text-muted-foreground">Pay when you receive</p>
                    </div>
                  </label>
                </div>

                <div className="space-y-4">
                  <Input label="Card Number" id="card" placeholder="4242 4242 4242 4242" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Expiry" id="expiry" placeholder="MM/YY" />
                    <Input label="CVC" id="cvc" placeholder="123" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
                  <Button size="lg" className="flex-1" onClick={handlePlaceOrder}>
                    Place Order – {formatPrice(grandTotal)}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="space-y-3">
                {items.slice(0, 4).map(item => {
                  const price = calculateDiscount(item.product.price, item.product.discount)
                  return (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                        <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(price * item.quantity)}</p>
                    </div>
                  )
                })}
                {items.length > 4 && (
                  <p className="text-xs text-muted-foreground text-center">+{items.length - 4} more items</p>
                )}
              </div>

              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryCharge === 0 ? <span className="text-success">Free</span> : formatPrice(deliveryCharge)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount ({discount}%)</span>
                    <span>-{formatPrice(totalDiscount)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
