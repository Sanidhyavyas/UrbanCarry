import { motion } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { HeroBanner } from '@/components/shop/HeroBanner'
import { CategoryCards } from '@/components/shop/CategoryCards'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { Testimonials } from '@/components/shop/Testimonials'
import { Newsletter } from '@/components/shop/Newsletter'
import { products } from '@/data/products'

export default function Home() {
  const featured = products.filter(p => p.popular).slice(0, 4)
  const newArrivals = products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4)

  return (
    <>
      <SEO
        title="UrbanCarry – Premium Backpacks for Urban Living"
        description="Discover premium backpacks and bags designed for modern urban professionals. Free shipping on orders over $50. 2-year warranty on all products."
        url="/"
      />

      <HeroBanner />

      <CategoryCards />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <span className="text-xs text-primary font-semibold uppercase tracking-wider">Featured</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-1">Popular Picks</h2>
            </div>
          </motion.div>
          <ProductGrid products={featured} columns={4} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <span className="text-xs text-primary font-semibold uppercase tracking-wider">New</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-1">Just Arrived</h2>
            </div>
          </motion.div>
          <ProductGrid products={newArrivals} columns={4} />
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  )
}
