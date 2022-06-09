import React, { useCallback, useReducer } from 'react';

import al from 'accept-language';
import cx from 'classnames';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { Outlet, useLoaderData } from 'remix';
import type { LinksFunction, MetaFunction, LoaderFunction } from 'remix';

import type { Meta } from '~/api/meta';
import metaFetcher from '~/api/meta';
import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';

import Icon from '~/components/Icon';
import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';
import Navigation from '~/components/layout/Navigation';
import Link from '~/components/Link';
import Logotype from '~/components/Logotype';
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
    href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap',
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
  const meta = (data as Data)?.meta;

  const description = meta?.description ?? 'Violeta Reed';
  const image = meta?.image ?? '/images/logotype.svg';
  const keywords = meta?.keywords ?? 'violeta reed, novelas, libros, novelas de amor, novela romantica';
  const title = meta?.title ?? 'Violeta Reed';
  const url = location.pathname;

  return {
    description,
    keywords,
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
  const { preview, profile } = useLoaderData<Data>();

  const [isNavOpen, toggle] = useReducer((state: boolean) => !state, false);

  const close = useCallback(() => {
    if (isNavOpen) {
      toggle();
    }
  }, [isNavOpen, toggle]);

  return (
    <IntlProvider defaultLocale="es" locale="es" messages={es}>
      <PreviewProvider value={preview ?? false}>
        <Document>
          <Header className="sticky top-0 z-50 w-full">
            <Header.Left>
              <button
                aria-label="Abrir navigación"
                aria-controls="navigation"
                aria-expanded={isNavOpen}
                className={
                  'flex h-full w-16 items-center justify-center text-sm font-medium transition-[background-color] hover:text-purple-800 focus:outline-none focus-visible:text-purple-800 lg:hidden'
                }
                onClick={toggle}
                type="button"
              >
                <Icon name="menu" />
              </button>
              <Navigation
                className={cx(
                  'absolute left-0 top-0 transition-[transform,visibility] duration-[350ms] ease-out lg:relative lg:translate-x-0 lg:transition-none',
                  isNavOpen ? 'visible translate-x-0' : 'invisible -translate-x-full',
                )}
                id="navigation"
              >
                <button
                  aria-label="Cerrar navigación"
                  className={
                    'flex h-16 w-16 items-center justify-center place-self-end text-sm font-medium text-white transition-[background-color] focus:outline-none lg:hidden'
                  }
                  onClick={close}
                  type="button"
                >
                  <Icon name="x" />
                </button>
                <Navigation.Link onClick={close} to="/">
                  <FormattedMessage defaultMessage="Inicio" id="HOME" />
                </Navigation.Link>
                <Navigation.Link onClick={close} to="/libros-violeta-reed">
                  <FormattedMessage defaultMessage="Novelas" id="BOOKS" />
                </Navigation.Link>
                <Navigation.Link onClick={close} to="/blog">
                  <FormattedMessage defaultMessage="Blog" id="BLOG" />
                </Navigation.Link>
                <Navigation.Link onClick={close} to="/sobre-mi">
                  <FormattedMessage defaultMessage="Sobre mí" id="ABOUT_ME" />
                </Navigation.Link>
              </Navigation>
            </Header.Left>

            <Link
              className="flex w-[250px] transition-[opacity,stroke] hover:stroke-black hover:opacity-80 focus-visible:stroke-black focus-visible:opacity-80 xl:w-[300px]"
              to="/"
            >
              <Logotype className="h-full w-full" />
            </Link>

            <Header.Right className="xl:px-12">
              {profile.social.map((link) => (
                <Header.Social key={link.name} name={link.name} url={link.url} />
              ))}
            </Header.Right>
          </Header>
          <Outlet />
          <Footer>
            {profile.social.map((link) => (
              <Footer.Social className="md:hidden" key={link.name} name={link.name} url={link.url} />
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
  return (
    <Document>
      <p>Parece que algo no anda muy bien</p>
    </Document>
  );
};

const ErrorBoundary = ({ error }: { error: Error }) => (
  <Document>
    <p>Parece que algo no anda muy bien</p>
  </Document>
);

export { CatchBoundary, ErrorBoundary, links, loader, meta };

export default App;
