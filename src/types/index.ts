export interface Product {
  id: string
  name: string
  brand: string
  category: 'laptop-bags' | 'college-backpacks' | 'travel-bags' | 'office-bags'
  description: string
  images: string[]
  price: number
  discount: number
  rating: number
  reviews: Review[]
  stock: number
  features: string[]
  specifications: Record<string, string>
  createdAt: string
  popular: boolean
}

export interface Review {
  id: string
  user: string
  avatar: string
  rating: number
  comment: string
  date: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Category {
  id: string
  name: string
  image: string
  count: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  image: string
  content: string
  rating: number
}

export type SortOption = 'popularity' | 'latest' | 'price-low' | 'price-high'
