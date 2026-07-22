const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

type EventParams = Record<string, string | number | boolean>

export const analytics = {
  init() {
    if (typeof window === 'undefined') return
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })
  },

  pageView(path: string) {
    window.gtag?.('event', 'page_view', { page_path: path })
  },

  addToCart(productId: string, name: string, price: number, quantity: number) {
    window.gtag?.('event', 'add_to_cart', {
      currency: 'USD',
      value: price * quantity,
      items: [{ item_id: productId, item_name: name, price, quantity }],
    })
  },

  removeFromCart(productId: string, name: string, price: number, quantity: number) {
    window.gtag?.('event', 'remove_from_cart', {
      currency: 'USD',
      value: price * quantity,
      items: [{ item_id: productId, item_name: name, price, quantity }],
    })
  },

  beginCheckout(items: Array<{ id: string; name: string; price: number; quantity: number }>) {
    window.gtag?.('event', 'begin_checkout', {
      currency: 'USD',
      value: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      items: items.map(i => ({ item_id: i.id, item_name: i.name, price: i.price, quantity: i.quantity })),
    })
  },

  purchase(orderId: string, items: Array<{ id: string; name: string; price: number; quantity: number }>, total: number) {
    window.gtag?.('event', 'purchase', {
      transaction_id: orderId,
      currency: 'USD',
      value: total,
      items: items.map(i => ({ item_id: i.id, item_name: i.name, price: i.price, quantity: i.quantity })),
    })
  },

  buttonClick(buttonName: string, label?: string) {
    window.gtag?.('event', 'button_click', { button_name: buttonName, label })
  },
}
