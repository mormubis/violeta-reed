import * as i18n from 'i18next';
import { useCallback, useEffect, useRef } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from 'react-router';

import metaFetcher from '~/api/meta';
import profileFetcher from '~/api/profile';
import QUOTES from '~/api/quotes';
import Heading from '~/components/Heading';
import Icon from '~/components/Icon';
import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';
import Navigation, {
  Item as NavigationItem,
} from '~/components/layout/Navigation';
import Link from '~/components/Link';
import Logotype from '~/components/Logotype';
import Quote from '~/components/Quote';

import type { Route } from './+types/root';
import type { ReactNode } from 'react';

import './app.css';

i18n.use(initReactI18next).init({
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
  lng: 'es',
  resources: {},
});

const links: Route.LinksFunction = () => [
  // Connect Google Fonts
  { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
  // Fonts
  {
    href: 'https://fonts.googleapis.com/css2?family=Italiana&family=Rajdhani:wght@300;400;500;600;700&display=swap',
    rel: 'stylesheet',
  },
];

const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [meta, profile] = await Promise.all([
    metaFetcher({ path: url.pathname }),
    profileFetcher(),
  ]);

  return { meta, preview, profile };
};

const meta: Route.MetaFunction = ({ data, location }: Route.MetaArgs) => {
  const metadata = data?.meta;

  const {
    description = 'Violeta Reed',
    image = '/images/logotype.svg',
    keywords = 'violeta reed, novelas, libros, novelas de amor, novela romantica',
    title = 'Violeta Reed',
  } = metadata ?? {};
  const url = location.pathname;

  return [
    { title },
    { content: description, name: 'description' },
    { content: keywords, name: 'keywords' },
    { content: 'Violeta Reed', name: 'author' },
    { content: 'website', name: 'og:type' },
    { content: url, name: 'og:url' },
    { content: title, name: 'og:title' },
    { content: description, name: 'og:description' },
    { content: image, name: 'og:image' },
    { content: 'summary_large_image', name: 'twitter:card' },
    { content: url, name: 'twitter:url' },
    { content: title, name: 'twitter:title' },
    { content: description, name: 'twitter:description' },
    { content: image, name: 'twitter:image' },
  ];
};

const Layout = ({ children }: { children: ReactNode }) => (
  <html lang="es">
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width,initial-scale=1" name="viewport" />

      {/* All meta exports on all routes will go here */}
      <Meta />

      {/* All link exports on all routes will go here */}
      <Links />
    </head>
    <body className="text-alabaster-950 flex min-h-screen w-screen flex-col items-center bg-white font-semibold">
      {children}

      {/* Manages scroll position for client-side transitions */}
      {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
      <ScrollRestoration />

      {/* Script tags go here */}
      {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
      <Scripts />
    </body>
  </html>
);

const App = () => {
  const navigationRef = useRef<HTMLElement>(null);

  const location = useLocation();
  const { profile } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  const year = new Date().getFullYear();

  const closeNavigation = useCallback(() => {
    navigationRef.current?.hidePopover();
  }, []);

  useEffect(() => {
    closeNavigation();
  }, [closeNavigation, location]);

  return (
    <>
      <Header className="sticky top-0 z-50 w-full [animation:header] gap-x-16 py-1 [animation-range:0_250px] [animation-timeline:scroll()] max-sm:[animation:none]">
        <button
          className="absolute top-0 left-0 flex h-12 w-12 items-center justify-center md:hidden"
          popoverTarget="navigation"
          type="button"
        >
          <span className="sr-only">{t('Abrir navegación')}</span>
          <Icon name="menu" />
        </button>
        <Navigation ref={navigationRef} id="navigation" popover="auto">
          <button
            className="absolute top-0 right-0 flex h-12 w-12 items-center justify-center text-sm font-medium text-white transition-[background-color] focus:outline-none md:hidden"
            type="button"
            onClick={closeNavigation}
          >
            <span className="sr-only">{t('Cerrar navegación')}</span>
            <Icon name="x" />
          </button>
          <NavigationItem to="/">{t('Inicio')}</NavigationItem>
          <NavigationItem to="/libros">{t('Mis libros')}</NavigationItem>
        </Navigation>

        <Link
          aria-label="Violeta Reed"
          className="flex w-[250px] transition-[opacity,stroke] hover:stroke-black hover:opacity-80 focus-visible:stroke-black focus-visible:opacity-80 xl:w-[300px]"
          to="/"
        >
          <Logotype className="text-finn-900 h-full w-full" />
        </Link>

        <aside className="hidden items-center gap-3 md:flex">
          {profile.social.map((link) => (
            <Link
              key={link.name}
              className={`opacity-50 saturate-0 !transition-[filter,opacity] hover:opacity-100 hover:saturate-100`}
              style={{ color: `var(--color-${link.name})` }}
              to={link.url}
            >
              <Icon className="h-5" name={link.name} />
            </Link>
          ))}
        </aside>
      </Header>

      <Outlet />

      <Footer className="gap-y-4">
        <aside className="flex items-center gap-5 md:hidden">
          {profile.social.map((link) => (
            <Link
              key={link.name}
              className={`opacity-75 saturate-50`}
              style={{ color: `var(--color-${link.name})` }}
              to={link.url}
            >
              <Icon className="h-5" name={link.name} />
            </Link>
          ))}
        </aside>
        <p className="text-center text-xs font-semibold">
          <span className="text-finn-900 text-sm font-bold">
            &copy; {year} Violeta Reed.
          </span>{' '}
          {t('Todos los derechos reservados')}
        </p>
      </Footer>
    </>
  );
};

function ErrorBoundary() {
  const { t } = useTranslation();

  const year = new Date().getFullYear();

  return (
    <>
      <main className="flex grow flex-col gap-y-4 px-4 md:px-4">
        <Link
          aria-label="Violeta Reed"
          className="flex w-[250px] transition-[opacity,stroke] hover:stroke-black hover:opacity-80 focus-visible:stroke-black focus-visible:opacity-80 xl:w-[300px]"
          to="/"
        >
          <Logotype className="text-finn-900 h-full w-full" />
        </Link>

        <Heading>{t('La página que buscar no existe.')}</Heading>
        <Heading level={2}>
          {t('Espero que esta cita te ayude en tu camino.')}
        </Heading>

        <Quote
          {...QUOTES[Math.floor(Math.random() * QUOTES.length)]}
          className="max-w-64"
        />
      </main>

      <Footer className="gap-y-4">
        <p className="text-center text-xs font-semibold">
          <span className="text-finn-900 text-sm font-bold">
            &copy; {year} Violeta Reed.
          </span>{' '}
          {t('Todos los derechos reservados')}
        </p>
      </Footer>
    </>
  );
}

export { ErrorBoundary, Layout, links, loader, meta };
export default App;
