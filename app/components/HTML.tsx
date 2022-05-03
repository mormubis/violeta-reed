import React, { useInsertionEffect } from 'react';

import cx from 'classnames';

export type OwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
  content: string;
};

type Props<E extends React.ElementType> = OwnProps<E> & Omit<React.ComponentProps<E>, keyof OwnProps>;

const defaultElement = 'div';

const HTML = <E extends React.ElementType = typeof defaultElement>({ as, className, content }: Props<E>) => {
  const Component = as ?? defaultElement;

  useInsertionEffect(() => {
    if (document.getElementById('__html')) {
      return;
    }

    const style = document.createElement('style');
    style.id = '__html';
    style.innerHTML = `
      .HTML a {
        background-color: rgb(221, 214, 254);
      }
      
      .HTML b, .HTML strong {
        font-weight: 600;
      }
      
      .HTML blockquote {
        padding-left: 1rem;
        position: relative;
      }
      
      .HTML blockquote::before {
        background-color: rgb(221, 214, 254);
        content: "";
        left: 0;
        height: 100%;
        position: absolute;
        width: 0.5rem;
      }
      
      .HTML figcaption {
        font-size: 0.8em;
        line-height: 3em;
        text-align: center;
      }
      
      .HTML figure {
        --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
        background-color: white;
        border-radius: 2px;
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        display: inline-block;
        margin: 0 auto 1rem;
        padding: 1rem;
      }
      
      .HTML h1 {
        font-size: 2.5rem;
      }
      
      .HTML h2 {
        font-size: 2rem;
      }
      
      .HTML h3 {
        font-size: 1.5rem;
      }
      
      .HTML h4 {
        font-size: 1.25rem;
      }
      
      .HTML hr {
        margin: 1.5rem 0;
      }
      
      .HTML img {
        border-radius: 2px;
        max-height: 300px;
      }
      
      .HTML ol {
        list-style: number;
        padding-left: 1.5rem;
      }
      
      .HTML p {
        margin: 0 0 1rem 0;
      }
      
      .HTML li {
        margin: 0.5rem 0;
      }
      
      .HTML ul {
        list-style: disc;
        padding-left: 1.5rem;
      }
      
      @media (min-width: 768px) {
        .HTML p {
          font-size: 15px;
        }
      }
    `;

    document.head.appendChild(style);
  }, []);

  return <Component className={cx('HTML', className)} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default HTML;
