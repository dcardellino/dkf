'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { Field, TextInput } from '@/components/form';
import { isAdminConfigured, startAdminSession, verifyAdminPassword } from '@/lib/admin-auth';

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  if (!isAdminConfigured()) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-line bg-white p-8">
        <h1 className="font-display text-2xl font-bold">Admin nicht konfiguriert</h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Setze die Umgebungsvariable{' '}
          <code className="rounded bg-paper px-1.5 py-0.5">NEXT_PUBLIC_ADMIN_PASSWORD_HASH</code> (SHA-256 des
          Passworts) und baue die Seite neu. Anleitung siehe README.
        </p>
      </div>
    );
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setChecking(true);
    setError('');
    const ok = await verifyAdminPassword(password);
    if (ok) {
      startAdminSession();
      onSuccess();
      return;
    }
    // Small delay to make blind guessing slightly less convenient.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setChecking(false);
    setError('Das Passwort ist nicht korrekt.');
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm rounded-xl border border-line bg-white p-8 shadow-sm">
      <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        <Lock aria-hidden className="size-5" />
      </span>
      <h1 className="mt-5 font-display text-2xl font-bold">Admin-Bereich</h1>
      <p className="mt-1 text-sm text-muted">Melde dich an, um eingegangene Anfragen zu sehen.</p>
      <div className="mt-6">
        <Field id="admin-password" label="Passwort" error={error}>
          <TextInput
            id="admin-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            value={password}
            invalid={!!error}
            aria-describedby={error ? 'admin-password-error' : undefined}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
      </div>
      <button
        type="submit"
        disabled={checking || !password}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ink font-semibold text-white hover:bg-ink-soft disabled:opacity-60"
      >
        {checking && <Loader2 aria-hidden className="size-4 animate-spin" />}
        Anmelden
      </button>
    </form>
  );
}
