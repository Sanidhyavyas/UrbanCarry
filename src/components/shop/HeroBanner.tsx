import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-flex px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider">
              New Collection 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Carry Smarter.
              <br />
              <span className="text-primary">Travel Better.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Premium backpacks engineered for modern urban life. Where style meets functionality, every journey begins with UrbanCarry.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" asChild>
                <Link to="/products" onClick={() => {}}>
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/products?category=travel-bags">Explore Collection</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 p-6">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
                alt="UrbanCarry Premium Backpack"
                className="w-full h-full object-cover rounded-xl shadow-2xl"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 shadow-lg">
              <p className="text-sm font-semibold">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders over $50</p>
            </div>
            <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 shadow-lg">
              <p className="text-sm font-semibold">2-Year Warranty</p>
              <p className="text-xs text-muted-foreground">On all products</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
