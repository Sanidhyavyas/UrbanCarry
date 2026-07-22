import { StarRating } from '@/components/ui/StarRating'

export function Testimonials() {
  const testimonials = [
    { name: 'Alex Morgan', role: 'Software Engineer', content: 'The Urban Pro Backpack transformed my daily commute. The USB charging port is a game-changer.', rating: 5 },
    { name: 'Jessica Lee', role: 'Travel Blogger', content: 'I have traveled to 20 countries with my Aviator Backpack. The most durable travel bag I have ever owned.', rating: 5 },
    { name: 'Michael Torres', role: 'College Student', content: 'Affordable, stylish, and built to last. My Campus Essential has survived two semesters and still looks new.', rating: 4 },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs text-primary font-semibold uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">What Our Customers Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <StarRating rating={t.rating} size="md" className="mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.content}"</p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
