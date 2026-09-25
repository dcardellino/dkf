import type { Metadata } from 'next';
import { InquiryFunnel } from '@/components/funnel/InquiryFunnel';
import { MinimalHeader } from '@/components/MinimalHeader';

export const metadata: Metadata = {
  title: 'Anfrage stellen – DKF-Bikes Herrenberg',
  description:
    'Unverbindliche Anfrage für Service, Reparatur, Umbau oder Restauration an Motorrad und PKW – DKF-Bikes, KFZ-Meisterbetrieb in Herrenberg.',
  alternates: { canonical: '/anfrage/' },
};

export default function InquiryPage() {
  return (
    <>
      <MinimalHeader />
      <main id="main" className="min-h-[calc(100dvh-4rem)] bg-white">
        <div className="container-page py-10 sm:py-16">
          <InquiryFunnel />
        </div>
      </main>
    </>
  );
}
