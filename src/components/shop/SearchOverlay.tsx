import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useSearch } from '@/context/SearchContext'
import { products } from '@/data/products'
import { cn } from '@/lib/utils'

export function SearchOverlay() {
  const { query, isOpen, setQuery, closeSearch } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const filtered = query
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeSearch} />
          <div className="relative max-w-2xl mx-auto mt-24 px-4">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  aria-label="Search products"
                />
                <button onClick={closeSearch} className="p-1 rounded-lg hover:bg-muted transition-colors cursor-pointer" aria-label="Close search">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {filtered.length > 0 && (
                <div className="p-2 max-h-80 overflow-y-auto">
                  {filtered.map(product => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {query && filtered.length === 0 && (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  No products found for "{query}"
                </div>
              )}

              {!query && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Type to search products...
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
