import { useSearchParams } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import { Filters } from '@/components/shop/Filters'
import { products } from '@/data/products'

export default function Products() {
  const [searchParams] = useSearchParams()
  const categoryFilter = searchParams.get('category') || ''

  const filtered = categoryFilter
    ? products.filter(p => p.category === categoryFilter.replace('cat-', ''))
    : products

  return (
    <>
      <SEO
        title="All Products – UrbanCarry"
        description="Browse our complete collection of premium backpacks, laptop bags, travel bags, and office bags. Find your perfect carry companion."
        url="/products"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">All Products</h1>
          <p className="text-muted-foreground mt-2">Discover our complete collection of premium bags</p>
        </div>

        <Filters products={filtered} />
      </div>
    </>
  )
}
