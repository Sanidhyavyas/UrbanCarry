import { motion } from 'framer-motion'
import { Target, Eye, TrendingUp, Award, Users, MapPin } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { teamMembers } from '@/data/products'

const stats = [
  { icon: Users, value: '50K+', label: 'Happy Customers' },
  { icon: TrendingUp, value: '100+', label: 'Products' },
  { icon: Award, value: '15+', label: 'Design Awards' },
  { icon: MapPin, value: '30+', label: 'Countries' },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export default function About() {
  return (
    <>
      <SEO title="About Us – UrbanCarry" description="Learn about UrbanCarry's mission to create premium, functional, and sustainable bags for modern urban living." url="/about" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs text-primary font-semibold uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">Our Story</h1>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            UrbanCarry was born from a simple observation: the modern professional needed a bag that could keep up. Not just a container for belongings, but a thoughtfully engineered companion for the urban journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
                alt="UrbanCarry workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Our Mission</h3>
                <p className="text-muted-foreground text-sm mt-1">To redefine everyday carry through innovative design, sustainable materials, and uncompromising quality — empowering people to move through their world with confidence.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Our Vision</h3>
                <p className="text-muted-foreground text-sm mt-1">A world where every journey is effortless. We envision a future where sustainable, beautiful design is accessible to everyone — and where your bag is your most reliable travel companion.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-muted border border-border">
              <stat.icon className="w-8 h-8 mx-auto text-primary mb-3" />
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp}>
          <h2 className="text-3xl font-bold text-center mb-10">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-primary font-medium">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
