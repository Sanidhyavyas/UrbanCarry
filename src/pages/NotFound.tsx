import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <SEO title="404 – Page Not Found" description="The page you are looking for does not exist." />

      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">404</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/"><Home className="w-4 h-4" /> Back to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products"><ArrowLeft className="w-4 h-4" /> All Products</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
