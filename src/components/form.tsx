import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
};

export function Field({ id, label, hint, error, optional, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

const controlClass =
  'block w-full rounded-md border bg-white px-4 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-500/30 focus:outline-none';

export function describedBy(id: string, error?: string, hint?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export function TextInput({ invalid, className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={`${controlClass} h-12 ${invalid ? 'border-red-600' : 'border-ink/15'} ${className}`}
    />
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export function TextArea({ invalid, className = '', ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      className={`${controlClass} min-h-36 py-3 ${invalid ? 'border-red-600' : 'border-ink/15'} ${className}`}
    />
  );
}

type ChoiceCardProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  description?: string;
  icon?: ReactNode;
};

// Large radio option styled as a selectable card.
export function ChoiceCard({ name, value, checked, onChange, title, description, icon }: ChoiceCardProps) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 bg-white p-4 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600 sm:p-5 ${
        checked ? 'border-brand-500 bg-brand-50' : 'border-line hover:border-ink/25'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {icon && (
        <span
          className={`inline-flex size-11 shrink-0 items-center justify-center rounded-lg ${
            checked ? 'bg-brand-500 text-ink' : 'bg-paper text-brand-600'
          }`}
        >
          {icon}
        </span>
      )}
      <span>
        <span className="block font-semibold">{title}</span>
        {description && <span className="mt-0.5 block text-sm text-muted">{description}</span>}
      </span>
    </label>
  );
}
