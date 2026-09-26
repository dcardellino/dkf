import type { Metadata } from 'next';
import { AdminApp } from '@/components/admin/AdminApp';
import { MinimalHeader } from '@/components/MinimalHeader';

export const metadata: Metadata = {
  title: 'Admin – DKF-Bikes',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <>
      <MinimalHeader />
      <main id="main" className="min-h-[calc(100dvh-4rem)] bg-paper">
        <div className="container-page py-10 sm:py-14">
          <AdminApp />
        </div>
      </main>
    </>
  );
}
