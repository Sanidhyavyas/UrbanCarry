import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import type { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { StarRating } from '@/components/ui/StarRating'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { formatPrice, calculateDiscount, cn } from '@/lib/utils'
import { analytics } from '@/utils/analytics'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const [showQuickView, setShowQuickView] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const discountedPrice = calculateDiscount(product.price, product.discount)
  const wishlisted = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    analytics.buttonClick('add_to_cart', product.name)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (wishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
      >
        <Link to={`/products/${product.id}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-muted" />}
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={cn(
                'w-full h-full object-cover transition-all duration-500 group-hover:scale-105',
                imgLoaded ? 'opacity-100' : 'opacity-0'
              )}
            />

            {product.discount > 0 && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-destructive text-white text-xs font-semibold">
                -{product.discount}%
              </span>
            )}

            {product.stock <= 10 && product.stock > 0 && (
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-warning text-white text-xs font-semibold">
                Only {product.stock} left
              </span>
            )}

            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl bg-white text-sm font-semibold">Out of Stock</span>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <Button size="sm" className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </Button>
              <Button size="icon" variant="secondary" onClick={handleToggleWishlist}>
                <Heart className={cn('w-4 h-4', wishlisted && 'fill-destructive text-destructive')} />
              </Button>
              <Button size="icon" variant="secondary" onClick={e => { e.preventDefault(); e.stopPropagation(); setShowQuickView(true) }}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{product.brand}</p>
            <h3 className="font-semibold text-sm leading-tight line-clamp-1">{product.name}</h3>
            <StarRating rating={product.rating} showValue />
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">{formatPrice(discountedPrice)}</span>
              {product.discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>

      <Modal isOpen={showQuickView} onClose={() => setShowQuickView(false)} className="max-w-2xl">
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{product.brand}</p>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <StarRating rating={product.rating} size="md" showValue />
              <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{formatPrice(discountedPrice)}</span>
                {product.discount > 0 && (
                  <span className="text-muted-foreground line-through">{formatPrice(product.price)}</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => { addItem(product); setShowQuickView(false) }} disabled={product.stock === 0}>
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </Button>
                <Button variant="outline" asChild>
                  <Link to={`/products/${product.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
