import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice, calculateDiscount } from '@/lib/utils'

export default function Wishlist() {
  const { items, removeItem, moveToCart } = useWishlist()

  if (items.length === 0) {
    return (
      <>
        <SEO title="Wishlist – UrbanCarry" description="View and manage your saved items." url="/wishlist" />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <Heart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground text-sm">Save your favorite items here.</p>
          <Button asChild><Link to="/products">Explore Products</Link></Button>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title="Wishlist – UrbanCarry" description="View and manage your saved items." url="/wishlist" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Wishlist</h1>
            <p className="text-sm text-muted-foreground mt-1">{items.length} saved items</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/products"><ArrowLeft className="w-4 h-4" /> Continue Shopping</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {items.map((product, i) => {
            const price = calculateDiscount(product.price, product.discount)
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl border border-border overflow-hidden bg-card hover:shadow-lg transition-shadow"
              >
                <Link to={`/products/${product.id}`} className="block">
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </Link>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.brand}</p>
                  <Link to={`/products/${product.id}`} className="font-semibold text-sm block line-clamp-1 hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-lg font-bold">{formatPrice(price)}</p>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" className="flex-1" onClick={() => moveToCart(product.id)}>
                      <ShoppingCart className="w-4 h-4" /> Move to Cart
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => removeItem(product.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}
