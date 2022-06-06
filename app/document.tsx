import React from 'react';

import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from 'remix';

type Props = {
  children?: React.ReactNode;
};

const Document = ({ children }: Props) => (
  <html className="overflow-x-hidden scroll-smooth" lang="es">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
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
    <body className="flex min-h-screen flex-col items-center bg-white font-serif font-normal font-light text-stone-900">
      {children}
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export default Document;
