import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { Services } from '@/components/sections/Services';
import { Specialties } from '@/components/sections/Specialties';
import { Gallery } from '@/components/sections/Gallery';
import { Prices } from '@/components/sections/Prices';
import { Process } from '@/components/sections/Process';
import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { MobileCtaBar } from '@/components/MobileCtaBar';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <Services />
        <Specialties />
        <Gallery />
        <Prices />
        <Process />
        <About />
        <Faq />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
