import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import type { Book } from '~/api/books';
import latestFetcher from '~/api/latest';
import type { News } from '~/api/latest';
import profileFetcher from '~/api/profile';
import type { Profile } from '~/api/profile';

import AboutMe from '~/components/AboutMe';
import BookPreview from '~/components/BookPreview';
import Heading from '~/components/Heading';
import HTML from '~/components/HTML';
import Icon from '~/components/Icon';
import Logotype from '~/components/Logotype';
import Page from '~/components/Page';
import PostPreview from '~/components/PostPreview';

const isBook = (item: any): item is Book => item.cover !== undefined;

const loader: LoaderFunction = async ({ request, ...rest }) => {
  console.log(rest);
  const url = new URL(request.url);
  const preview = Boolean(url.searchParams.get('preview'));

  const [latest, profile] = await Promise.all([latestFetcher({ preview }), profileFetcher({ preview })]);

  return { latest, profile: { avatar: profile.avatar, bio: profile.bio, social: profile.social } };
};

const Index = () => {
  const intl = useIntl();

  const { latest, profile } = useLoaderData<{ latest: News[]; profile: Profile }>();

  const label = intl.formatMessage({ id: 'READ_MORE', defaultMessage: 'Leer más' });

  return (
    <Page>
      <section className="relative -mx-3 -mt-20 flex h-screen flex-col items-center justify-center border-b border-stone-200 bg-white md:-mx-6 md:-mt-5 md:h-auto md:py-16 xl:col-span-2 xl:m-0 xl:justify-start xl:border-0 xl:bg-transparent">
        <header className="md:h-48">
          <Logotype className="m-auto h-full w-5/6 text-purple-400 xl:stroke-purple-600 xl:stroke-[5]" />
        </header>

        <figure className="flex flex-col gap-10 xl:hidden">
          <img
            alt="Violeta Reed"
            className="m-auto h-56 w-56 rounded-full border-4 border-solid border-purple-200 object-cover"
            src={profile.avatar}
          />
          <figcaption>
            <HTML className="text-center" content={profile.bio} />
          </figcaption>
          <a
            aria-label={label}
            className="absolute left-0 bottom-5 flex w-full justify-center text-center motion-safe:animate-bounce md:hidden"
            href="#home"
          >
            <Icon className="h-8 text-stone-300" name="arrow-circle-down" />
          </a>
        </figure>
      </section>

      <section className="flex flex-col gap-3 pt-20 md:m-0 md:px-0" id="home">
        <Heading as="h2" level={2}>
          <FormattedMessage defaultMessage="Últimas actualizaciones" id="LATEST_NEWS" />
        </Heading>

        <ul className="-mx-3 flex flex-col gap-5 md:mx-0 lg:grid lg:grid-cols-2 xl:grid-cols-1">
          {latest.map((item) => (
            <li key={item.slug}>
              {isBook(item) ? (
                <BookPreview {...item} href={`/books/${item.slug}`} titleComponent="h3" />
              ) : (
                <PostPreview {...item} author="Violeta Reed" href={`/blog/${item.slug}`} titleComponent="h3" />
              )}
            </li>
          ))}
        </ul>
      </section>

      <Page.Sidebar>
        <AboutMe {...profile} />
      </Page.Sidebar>
    </Page>
  );
};

export { loader };

export default Index;
