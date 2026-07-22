import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Heart, ShoppingBag, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useSearch } from '@/context/SearchContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { SearchOverlay } from '@/components/shop/SearchOverlay'

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { itemCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { openSearch } = useSearch()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled ? 'glass shadow-sm' : 'bg-transparent'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="UrbanCarry Home">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg tracking-tight">UrbanCarry</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {links.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === link.href
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button onClick={openSearch} className="p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer" aria-label="Search products">
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>

              <Link to="/wishlist" className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Wishlist">
                <Heart className="w-5 h-5 text-muted-foreground" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Shopping cart">
                <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-white overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {links.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      location.pathname === link.href
                        ? 'text-primary bg-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchOverlay />
    </>
  )
}
