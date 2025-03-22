import { clsx } from 'clsx';

import type { ComponentProps } from 'react';

type OwnProps = {
  quote: string;
  book: string;
};

type Props = OwnProps & Omit<ComponentProps<'aside'>, keyof OwnProps>;

const Quote = ({ book, className, quote, ...props }: Props) => (
  <aside
    {...props}
    className={clsx(
      'bg-deep-blush-50 border-l-finn-900 inline-flex flex-col gap-y-2 border-l-4 px-4 py-6',
      className,
    )}
  >
    <blockquote>{quote}</blockquote>
    <cite className="text-finn-950 font-serif font-bold uppercase">{book}</cite>
  </aside>
);

export default Quote;
