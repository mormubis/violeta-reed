import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import Heading from '~/components/Heading';
import Section, { Content, Image, Title } from '~/components/Page/Section';

import Cover from './Cover';
import HTML from './HTML';

import type { CSSProperties, ComponentProps } from 'react';
import type { Asset } from '~/api/assets';
import type { Book as BookType } from '~/api/books';

type OwnProps = {
  assets: Record<string, Asset>;
  index?: number;
  landing?: boolean;
};

type Props = OwnProps &
  BookType &
  Omit<ComponentProps<'article'>, keyof OwnProps | keyof BookType>;

const TODAY = new Date();

const Book = ({
  assets,
  checkout,
  color,
  cover,
  index,
  landing,
  publishedAt,
  series,
  slug,
  synopsis,
  title,
  ...props
}: Props) => {
  const { t } = useTranslation();
  const style = { '--color': color } as CSSProperties;
  const publishedDate = publishedAt ? new Date(publishedAt) : null;

  return (
    <Section {...props} as="article" index={index} style={style}>
      <div className="absolute -top-16 z-10 lg:-top-32" id={slug} />
      <Image>
        <Cover
          className="h-64 border border-[hsl(from_var(--color)_h_calc(s_/_1.25)_l)] transition-all duration-700 md:h-auto md:border-2 starting:translate-y-1/2 starting:opacity-0"
          title={cover.description ?? title}
          url={cover.url}
        />
      </Image>
      <Title as="h2" level={2}>
        {title}
      </Title>
      <Content>
        {series && (
          <Heading
            as="p"
            className="-mt-5 text-[color:var(--color)] uppercase opacity-80"
            level={3}
          >
            {series}
          </Heading>
        )}
        <HTML className="max-w-none" content={synopsis} />
        {publishedDate && publishedDate > TODAY && (
          <p className="border-b-solid place-self-center border-b-2 border-[color:var(--color)] text-center text-xl">
            {t('A la venta el { date, date, long }', { date: publishedDate })}
          </p>
        )}
        {checkout.length > 0 && (
          <div className="-mx-3 -mb-5 hidden grid-cols-3 justify-items-center gap-5 bg-white px-3 py-3 md:grid md:grid-cols-7 md:bg-transparent">
            <Heading as="h3" className="col-span-3 md:col-span-7" level={3}>
              {t('Cómpralo en')}
            </Heading>
            {checkout
              .filter((link) =>
                landing
                  ? ['Amazon', 'Casa del Libro', 'Penguin'].some((store) =>
                      link.name.includes(store),
                    )
                  : true,
              )
              .map((link, index) => {
                const key = link.name
                  .split('-')[0]
                  .replace(/\s/g, '')
                  .toLowerCase();

                const asset = assets[key];

                return (
                  asset && (
                    <a
                      key={link.url}
                      aria-label={link.name}
                      className={clsx(
                        landing && index === 0 && 'md:col-start-3',
                      )}
                      href={link.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <img
                        alt={asset.title}
                        className="h-16 object-contain"
                        src={asset.url}
                      />
                    </a>
                  )
                );
              })}
          </div>
        )}
      </Content>
    </Section>
  );
};

export default Book;
