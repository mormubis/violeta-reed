import React from 'react';

import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from '@remix-run/react';

type Props = {
  children?: React.ReactNode;
};

const Document = ({ children }: Props) => (
  <html className="overflow-x-hidden scroll-smooth" lang="es">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />

      {/* All meta exports on all routes will go here */}
      <Meta />

      {/* All link exports on all routes will go here */}
      <Links />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-display: swap;
              font-family: 'Gill Sans';
              font-style: normal;
              font-weight: 400;
              src:  url(/fonts/GillSans.woff) format('ttf');
            }
            
            @font-face {
              font-display: swap;
              font-family: 'Gill Sans';
              font-style: normal;
              font-weight: 700;
              src:  url(/fonts/GillSansBold.woff) format('ttf');
            }
            
            @font-face {
              font-display: swap;
              font-family: 'Gill Sans';
              font-style: italic;
              font-weight: 700;
              src:  url(/fonts/GillSansBoldItalic.woff) format('ttf');
            }
            
            @font-face {
              font-display: swap;
              font-family: 'Gill Sans';
              font-style: normal;
              font-weight: 300;
              src:  url(/fonts/GillSansLight.woff) format('ttf');
            }
          `,
        }}
      />
    </head>
    <body className="flex min-h-screen w-screen flex-col items-center bg-white font-light text-stone-900">
      {children}

      {/* Manages scroll position for client-side transitions */}
      {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
      <ScrollRestoration />

      {/* Script tags go here */}
      {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
      <Scripts />

      {/* Sets up automatic reload when you change code */}
      {/* and only does anything during development */}
      {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
      <LiveReload />
    </body>
  </html>
);

export default Document;
