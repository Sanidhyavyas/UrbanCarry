import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ShoppingCart, Heart, Check, Truck, Shield, RotateCcw } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { products } from '@/data/products'
import { formatPrice, calculateDiscount, cn } from '@/lib/utils'

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        <Button asChild><Link to="/products">Back to Products</Link></Button>
      </div>
    )
  }

  const discountedPrice = calculateDiscount(product.price, product.discount)
  const wishlisted = isInWishlist(product.id)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const toggleWishlist = () => {
    if (wishlisted) removeFromWishlist(product.id)
    else addToWishlist(product)
  }

  return (
    <>
      <SEO
        title={`${product.name} – UrbanCarry`}
        description={product.description}
        image={product.images[0]}
        url={`/products/${product.id}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors cursor-pointer',
                    selectedImage === i ? 'border-primary' : 'border-border hover:border-muted-foreground'
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">{product.brand}</p>
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <StarRating rating={product.rating} size="md" showValue />
                <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{formatPrice(discountedPrice)}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
                  <span className="px-2 py-1 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold">Save {product.discount}%</span>
                </>
              )}
            </div>

            {product.stock > 0 ? (
              <p className="text-sm text-success flex items-center gap-1">
                <Check className="w-4 h-4" /> In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-sm text-destructive">Out of Stock</p>
            )}

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-xl">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >-</button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >+</button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </Button>
              <Button size="icon" variant="outline" onClick={toggleWishlist}>
                <Heart className={cn('w-4 h-4', wishlisted && 'fill-destructive text-destructive')} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="text-xs font-medium">Free Shipping</p>
                <p className="text-[10px] text-muted-foreground">On orders $50+</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="text-xs font-medium">2-Year Warranty</p>
                <p className="text-[10px] text-muted-foreground">Peace of mind</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="text-xs font-medium">30-Day Returns</p>
                <p className="text-[10px] text-muted-foreground">No questions asked</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-semibold">Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-semibold">Specifications</h3>
              <dl className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <dt className="text-muted-foreground">{key}:</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="font-semibold mb-4">Reviews ({product.reviews.length})</h3>
              <div className="space-y-4">
                {product.reviews.map(r => (
                  <div key={r.id} className="pb-4 border-b border-border last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{r.user}</span>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <StarRating rating={r.rating} size="sm" className="mb-1" />
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 md:mt-24">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <ProductGrid products={related} columns={4} />
          </section>
        )}
      </div>
    </>
  )
}
