import React, { useCallback, useState } from 'react';

import cx from 'classnames';
import normalize from 'normalize.css';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData } from 'remix';
import type { LinksFunction, MetaFunction, LoaderFunction } from 'remix';

import type { Profile } from '~/api/profile';
import profileFetcher from '~/api/profile';
import type { Meta as MetaType } from '~/api/meta';
import metaFetcher from '~/api/meta';
import useEventListener from '~/use/eventListener';

import Footer from './components/Footer';
import Header from './components/Header';
import Navigation from './components/Navigation';
import tailwind from './tailwind.css';

type DocumentProps = {
  children?: React.ReactNode;
  title?: string;
};

type LoaderData = {
  meta: MetaType | null;
  profile: Profile;
};

const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  { rel: 'stylesheet', href: normalize },
  { rel: 'stylesheet', href: tailwind },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400;500;700&family=Open+Sans:wght@300;400;500;700&display=swap',
  },
];

const loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
  const url = new URL(request.url);

  const [meta, profile] = await Promise.all([metaFetcher({ path: url.pathname }), profileFetcher()]);

  return { meta, profile };
};

const meta: MetaFunction = ({ data, location }) => {
  const meta = data.meta;

  const description = meta?.description ?? 'Violeta Reed';
  const image = meta?.image ?? 'https://violetareed.com/assets/images/violeta-reed-logo.png';
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

const Document = ({ children, title }: DocumentProps) => {
  return (
    <html className="scroll-smooth" lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col items-center bg-slate-50 font-sans text-stone-900">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

const App = () => {
  const { profile } = useLoaderData<LoaderData>();

  const [isNavOpen, setIsNavOpen] = useState(false);

  const close = useCallback(() => isNavOpen && setIsNavOpen(false), [isNavOpen]);
  const toggle = useCallback(() => setIsNavOpen((prevState) => !prevState), []);

  useEventListener('click', close);

  return (
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
          Menu
        </button>
        <Navigation
          className={cx(isNavOpen ? 'visible' : 'invisible transition-[visibility] duration-[350ms] ease-out')}
          id="navigation"
        >
          <Navigation.Link to="/#home">Inicio</Navigation.Link>
          <Navigation.Link className="focus-visible:bg-teal-50" to="/books">
            Libros
          </Navigation.Link>
          <Navigation.Link to="/blog">Blog</Navigation.Link>
          <Navigation.Link to="/about">Sobre m&iacute;</Navigation.Link>
        </Navigation>
      </Header>
      <Outlet />
      <Footer>
        {profile.social.map((link) => (
          <Footer.Social key={link.name} name={link.name} url={link.url} />
        ))}
        <Footer.Copyright className="">Violeta Reed. All Rights Reserved</Footer.Copyright>
      </Footer>
    </Document>
  );
};

function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <p>
        [CatchBoundary]: {caught.status} {caught.statusText}
      </p>
    </Document>
  );
}

function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <p>[ErrorBoundary]: There was an error: {error.message}</p>
    </Document>
  );
}

export { CatchBoundary, links, loader, meta };

export default App;
