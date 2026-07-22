import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <SEO title="Contact Us – UrbanCarry" description="Get in touch with UrbanCarry. We'd love to hear from you." url="/contact" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs text-primary font-semibold uppercase tracking-wider">Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">Get in Touch</h1>
          <p className="text-muted-foreground mt-4">Have a question, feedback, or just want to say hello? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <Button variant="outline" size="sm" className="mt-6" onClick={() => setSubmitted(false)}>Send Another Message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input label="First Name" id="firstName" placeholder="John" required />
                  <Input label="Last Name" id="lastName" placeholder="Doe" required />
                </div>
                <Input label="Email" id="email" type="email" placeholder="john@example.com" required />
                <Input label="Subject" id="subject" placeholder="How can we help?" required />
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Tell us more..."
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4" /> Send Message
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            <div className="p-6 rounded-2xl bg-muted border border-border space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Email</h4>
                  <a href="mailto:hello@urbancarry.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">hello@urbancarry.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Phone</h4>
                  <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-primary transition-colors">+1 (234) 567-890</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Address</h4>
                  <p className="text-sm text-muted-foreground">123 Business Ave, Suite 200<br />New York, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Business Hours</h4>
                  <p className="text-sm text-muted-foreground">Mon–Fri: 9 AM – 6 PM<br />Sat: 10 AM – 4 PM</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-muted border border-border">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 mr-2" /> Interactive Map
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
