import React from 'react';

import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from 'remix';

type Props = {
  children?: React.ReactNode;
};

const Document = ({ children }: Props) => (
  <html className="scroll-smooth" lang="es">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body className="flex min-h-screen flex-col items-center bg-white font-sans font-light text-stone-900">
      {children}
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export default Document;
