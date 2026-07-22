import { useState, useMemo } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import type { Product, SortOption } from '@/types'
import { Button } from '@/components/ui/Button'
import { ProductCard } from './ProductCard'
import { cn } from '@/lib/utils'

interface FiltersProps {
  products: Product[]
  searchQuery?: string
  className?: string
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'laptop-bags', label: 'Laptop Bags' },
  { value: 'college-backpacks', label: 'College Backpacks' },
  { value: 'travel-bags', label: 'Travel Bags' },
  { value: 'office-bags', label: 'Office Bags' },
]

const priceRanges = [
  { value: '', label: 'Any Price' },
  { value: '0-50', label: 'Under $50' },
  { value: '50-100', label: '$50 – $100' },
  { value: '100-150', label: '$100 – $150' },
  { value: '150-999', label: 'Over $150' },
]

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'latest', label: 'Latest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
]

export function Filters({ products, searchQuery = '', className }: FiltersProps) {
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState<SortOption>('popularity')
  const [mobileOpen, setMobileOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    }

    if (category) result = result.filter(p => p.category === category)
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number)
      result = result.filter(p => p.price >= min && p.price <= max)
    }
    if (minRating > 0) result = result.filter(p => p.rating >= minRating)

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'latest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break
      default: result.sort((a, b) => b.rating - a.rating); break
    }

    return result
  }, [products, searchQuery, category, priceRange, minRating, sort])

  const hasFilters = category || priceRange || minRating > 0

  const clearFilters = () => {
    setCategory('')
    setPriceRange('')
    setMinRating(0)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Category</h4>
        <div className="space-y-1">
          {categories.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer',
                category === c.value ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Price Range</h4>
        <div className="space-y-1">
          {priceRanges.map(p => (
            <button
              key={p.value}
              onClick={() => setPriceRange(p.value)}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer',
                priceRange === p.value ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Rating</h4>
        <div className="space-y-1">
          {[4, 3, 2, 1].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={cn(
                'block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer',
                minRating === r ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              )}
            >
              {r}+ Stars
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
          <X className="w-4 h-4" /> Clear Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{filtered.length} product{filtered.length !== 1 && 's'}</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortOption)}
            className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:border-primary"
            aria-label="Sort by"
          >
            {sortOptions.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {category && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
              {categories.find(c => c.value === category)?.label}
              <button onClick={() => setCategory('')} className="cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}
          {priceRange && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
              {priceRanges.find(p => p.value === priceRange)?.label}
              <button onClick={() => setPriceRange('')} className="cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
              {minRating}+ Stars
              <button onClick={() => setMinRating(0)} className="cursor-pointer"><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden lg:block">
          <FilterContent />
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setMobileOpen(false)} className="cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </div>
  )
}
