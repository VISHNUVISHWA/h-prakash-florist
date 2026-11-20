import { Header } from '@/components/layout/Header';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { Footer } from '@/components/layout/Footer';
import { FloatingContactButton } from '@/components/layout/FloatingContactButton';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrandIntroduction } from '@/components/sections/BrandIntroduction';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { WeddingShowcase } from '@/components/sections/WeddingShowcase';
import { EventShowcase } from '@/components/sections/EventShowcase';
import { PromotionalBanner } from '@/components/sections/PromotionalBanner';
import { Gallery } from '@/components/sections/Gallery';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ConsultationForm } from '@/components/sections/ConsultationForm';
import { InstagramGallery } from '@/components/sections/InstagramGallery';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { LazyOverlays } from '@/components/overlays/LazyOverlays';
import { Toaster } from '@/components/overlays/Toaster';

export default function HomePage() {
  return (
    <>
      <Header />
      <MobileNavigation />
      <main id="main">
        <HeroSection />
        <BrandIntroduction />
        <CategoryGrid />
        <FeaturedProducts />
        <WeddingShowcase />
        <EventShowcase />
        <PromotionalBanner />
        <Gallery />
        <Testimonials />
        <WhyChooseUs />
        <ProcessSection />
        <ConsultationForm />
        <InstagramGallery />
        <FAQAccordion />
      </main>
      <Footer />

      {/* Overlays */}
      <FloatingContactButton />
      <LazyOverlays />
      <Toaster />
    </>
  );
}
