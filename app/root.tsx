import React, { useReducer } from 'react';

import al from 'accept-language';
import cx from 'classnames';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { Outlet, useCatch, useLoaderData } from 'remix';
import type { LinksFunction, MetaFunction, LoaderFunction } from 'remix';

import type { Meta } from '~/api/meta';
import metaFetcher from '~/api/meta';
import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';

import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';
import Navigation from '~/components/layout/Navigation';
import { Provider as PreviewProvider } from '~/components/Preview';

import Document from './document';

import es from '~/translations/es.json';

import tailwind from './tailwind.css';
import normalize from 'normalize.css';

type Data = {
  locale: string;
  meta: Meta | null;
  preview?: boolean;
  profile: Profile;
};

// Setting languages we support
al.languages(['en', 'es']);

const links: LinksFunction = () => [
  // Pre connect Google Fonts
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  // Reset styles
  { rel: 'stylesheet', href: normalize },
  // Tailwind styles
  { rel: 'stylesheet', href: tailwind },
  // Fonts
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap',
  },
];

const loader: LoaderFunction = async ({ request }): Promise<Data> => {
  const locale = al.get(request.headers.get('accept-language')) ?? 'es';

  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [meta, profile] = await Promise.all([metaFetcher({ path: url.pathname }), profileFetcher()]);

  return { locale, meta, preview, profile };
};

const meta: MetaFunction = ({ data, location }) => {
  const meta = (data as Data).meta;

  const description = meta?.description ?? 'Violeta Reed';
  const image = meta?.image ?? '/images/logotype.png';
  const title = meta?.title ?? 'Violeta Reed';
  const url = location.pathname;

  return {
    description,
    title,
    'og:type': 'website',
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'twitter:card': 'summary_large_image',
    'twitter:url': url,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  };
};

const App = () => {
  const { locale, preview, profile } = useLoaderData<Data>();

  const [isNavOpen, toggle] = useReducer((state: boolean) => !state, false);

  return (
    <IntlProvider defaultLocale="es" locale={locale} messages={es}>
      <PreviewProvider value={preview ?? false}>
        <Document>
          <Header
            className={cx('transition-transform duration-[350ms] ease-out md:!translate-y-0 md:transition-none', {
              'translate-y-[192px]': isNavOpen,
            })}
          >
            <button
              aria-controls="navigation"
              aria-expanded={isNavOpen}
              className={
                'flex w-full items-center justify-center text-sm font-medium uppercase transition-[background-color] focus:outline-none focus-visible:bg-stone-800 md:hidden'
              }
              onClick={toggle}
              type="button"
            >
              <FormattedMessage defaultMessage="Menu" id="MENU" />
            </button>
            <Navigation
              className={cx(isNavOpen ? 'visible' : 'invisible transition-[visibility] duration-[350ms] ease-out')}
              id="navigation"
            >
              <Navigation.Link className="md:hidden" to="/#home">
                <FormattedMessage defaultMessage="Inicio" id="HOME" />
              </Navigation.Link>
              <Navigation.Link className="hidden md:flex" to="/">
                <FormattedMessage defaultMessage="Inicio" id="HOME" />
              </Navigation.Link>
              <Navigation.Link to="/books">
                <FormattedMessage defaultMessage="Libros" id="BOOKS" />
              </Navigation.Link>
              <Navigation.Link to="/blog">
                <FormattedMessage defaultMessage="Blog" id="BLOG" />
              </Navigation.Link>
              <Navigation.Link to="/about">
                <FormattedMessage defaultMessage="Sobre mí" id="ABOUT_ME" />
              </Navigation.Link>
            </Navigation>
            <Header.Right>
              {profile.social.map((link) => (
                <Header.Social key={link.name} name={link.name} url={link.url} />
              ))}
            </Header.Right>
          </Header>
          <Outlet />
          <Footer>
            {profile.social.map((link) => (
              <Footer.Social key={link.name} name={link.name} url={link.url} />
            ))}
            <Footer.Copyright>
              <FormattedMessage defaultMessage="Violeta Reed. All Rights Reserved" id="COPYRIGHT" />
            </Footer.Copyright>
          </Footer>
        </Document>
      </PreviewProvider>
    </IntlProvider>
  );
};

const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <Document>
      <p>
        [CatchBoundary]: {caught.status} {caught.statusText}
      </p>
    </Document>
  );
};

// const ErrorBoundary = ({ error }: { error: Error }) => (
//   <Document>
//     <p>[ErrorBoundary]: There was an error: {error.message}</p>
//   </Document>
// );

export { CatchBoundary, links, loader, meta };

export default App;
