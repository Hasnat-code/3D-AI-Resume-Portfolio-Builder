import Navbar       from '@/components/layout/Navbar'
import Footer       from '@/components/layout/Footer'
import Hero         from '@/components/sections/Hero'
import Features     from '@/components/sections/Features'
import AIDemo       from '@/components/sections/AIDemo'
import Templates    from '@/components/sections/Templates'
import Pricing      from '@/components/sections/Pricing'
import Testimonials from '@/components/sections/Testimonials'
import CTA          from '@/components/sections/CTA'

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <AIDemo />
      <Templates />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}