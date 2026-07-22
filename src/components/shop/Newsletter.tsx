export function Newsletter() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5" />
          </div>

          <div className="relative text-center max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay in the Loop</h2>
            <p className="text-blue-100 text-sm mb-6">Subscribe for exclusive offers, new arrivals, and 10% off your first order.</p>
            <form onSubmit={e => e.preventDefault()} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-5 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder:text-blue-200 focus:outline-none focus:border-white/50"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="h-12 px-6 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
