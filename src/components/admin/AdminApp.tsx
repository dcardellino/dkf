'use client';

import { useSyncExternalStore, useState } from 'react';
import { endAdminSession, hasAdminSession } from '@/lib/admin-auth';
import { AdminDashboard } from './AdminDashboard';
import { AdminLogin } from './AdminLogin';

const subscribe = () => () => {};

export function AdminApp() {
  // Session state lives in sessionStorage, which is only readable on the client.
  const storedSession = useSyncExternalStore(subscribe, hasAdminSession, () => null);
  const [override, setOverride] = useState<boolean | null>(null);
  const loggedIn = override ?? storedSession;

  if (loggedIn === null) return null;

  if (!loggedIn) return <AdminLogin onSuccess={() => setOverride(true)} />;

  return (
    <AdminDashboard
      onLogout={() => {
        endAdminSession();
        setOverride(false);
      }}
    />
  );
}
