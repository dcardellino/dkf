type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: 'left' | 'center';
  id?: string;
};

export function SectionHeading({ eyebrow, title, text, align = 'left', id }: Props) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 heading-lg">
        {title}
      </h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>}
    </div>
  );
}
