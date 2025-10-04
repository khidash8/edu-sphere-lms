import { Hero } from '@/features/home/components/hero/hero';
import { About } from '@/features/home/components/about/about';
import { HowItWorks } from '@/features/home/components/how-it-works/how-it-works';
import { Features } from '@/features/home/components/features/features';
import { Services } from '@/features/home/components/services/services';
import { Testimonials } from '@/features/home/components/testimonial/testimonials';
import { Pricing } from '@/features/home/components/pricing/pricing';
import { FAQ } from '@/features/home/components/faq/faq';
import { Footer } from '@/features/home/components/footer/footer';
import { ScrollToTop } from '@/components/scroll-to-top';

export default async function Home() {
  return (
    <div
      className={
        ' px-6 md:px-10 lg:px-20 pb-4 flex items-center justify-center flex-col gap-10'
      }
    >
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
