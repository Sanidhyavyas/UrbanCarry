import { createContext, useContext, useState, type ReactNode } from 'react'

interface SearchContextValue {
  query: string
  isOpen: boolean
  setQuery: (q: string) => void
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SearchContext.Provider
      value={{
        query,
        isOpen,
        setQuery,
        openSearch: () => setIsOpen(true),
        closeSearch: () => { setIsOpen(false); setQuery('') },
        toggleSearch: () => setIsOpen(p => !p),
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within SearchProvider')
  return ctx
}
