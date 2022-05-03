import React from 'react';

import type { LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';

import postFetcher from '~/api/posts';
import type { Post } from '~/api/posts';
import profileFetcher from '~/api/profile';
import type { Profile } from '~/api/profile';

import Card from '~/components/Card';
import Logotype from '~/components/Logotype';
import HTML from '~/components/HTML';
import Icon from '~/components/Icon';
import Page from '~/components/Page';
import Posts from '~/components/Posts';

const loader: LoaderFunction = async (...argv) => {
  const [posts, profile] = await Promise.all([postFetcher({ limit: 5 }), profileFetcher()]);

  return { profile: { avatar: profile.avatar, bio: profile.bio }, posts };
};

const Index = () => {
  const { profile, posts } = useLoaderData<{ profile: Profile; posts: Post[] }>();

  return (
    <Page className="gap-y-10 xl:grid xl:grid-cols-[minmax(0,_1fr)_350px]">
      <section className="relative -mx-3 -mt-20 flex h-screen flex-col items-center justify-center border-b border-stone-200 bg-white md:-mx-6 md:-mt-5 md:h-auto md:pt-16 md:pt-0 xl:col-span-2 xl:m-0 xl:justify-start xl:border-0 xl:bg-transparent">
        <header className="py-4 md:h-64">
          <Logotype className="m-auto h-full w-5/6 text-purple-400 xl:stroke-stone-900 xl:stroke-2" />
        </header>

        <figure className="xl:hidden">
          <img
            alt="Violeta Reed"
            className="m-auto h-56 w-56 rounded-full border-4 border-solid border-purple-200 object-cover"
            src={profile.avatar}
          />
          <figcaption>
            <HTML className="text-center" content={profile.bio} />
          </figcaption>
          <a
            className="absolute left-0 bottom-5 flex w-full justify-center text-center motion-safe:animate-bounce md:hidden"
            href="#home"
          >
            <Icon className="h-8 text-stone-300" name="arrow-circle-down" />
          </a>
        </figure>
      </section>

      <div className="order-3 hidden xl:block">
        <Card>
          <img
            alt="Violeta Reed"
            className="m-auto h-56 w-56 rounded-full border-4 border-solid border-purple-200 object-cover"
            src={profile.avatar}
          />
          <figcaption>
            <HTML className="text-center" content={profile.bio} />
          </figcaption>
          <a
            className="absolute left-0 bottom-5 flex w-full justify-center text-center motion-safe:animate-bounce md:hidden"
            href="#home"
          >
            <Icon className="h-8 text-stone-300" name="arrow-circle-down" />
          </a>
        </Card>
      </div>

      <section className="-mx-3 flex flex-col gap-3 px-3 md:m-0 md:px-0 md:pt-3" id="home">
        <h2 className="font-serif text-xl font-bold">Últimas actualizaciones</h2>

        <Posts className="xl:grid-cols-1" items={posts} />
      </section>
    </Page>
  );
};

export { loader };

export default Index;
