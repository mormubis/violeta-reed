import { LRUCache as Cache } from 'lru-cache';

import type { Props } from '~/components/LinkSocial';
import graphql from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

import query from './query.graphql';

import type { ProfileQuery, ProfileQueryVariables } from '~/.graphql/types';

type LoaderParams = {
  preview?: boolean;
};

type Profile = {
  about: string;
  avatar: string;
  bio: string;
  name: string;
  social: { name: Props['name']; url: string }[];
};

const DAY = 24 * 60 * 60 * 1000;

const DEFAULT = {
  about: '',
  avatar:
    'https://images.ctfassets.net/v1kazl7nd6vv/vXU5OyezNm0ZVqctsc6In/73ed6eeea572e016e9aac8fd85ec2b79/photo_2022-04-27_22.34.15.jpeg?fm=webp',
  bio: 'Os doy la bienvenida a mi País de las Maravillas. Aquí encontraréis un trocito más de mí.',
  name: 'Violeta Reed',
  social: [],
};

const cache = new Cache<'profile', Profile, LoaderParams>({
  async fetchMethod(key, stale, { context: { preview } }) {
    const { profileCollection } = await graphql<ProfileQuery, ProfileQueryVariables>(query, { preview });

    if (!profileCollection) {
      return DEFAULT;
    }

    const { items } = profileCollection;

    if (!items) {
      return DEFAULT;
    }

    const [profile] = items;

    if (!profile) {
      return DEFAULT;
    }

    const { items: social = [] } = profile?.socialCollection ?? {};

    return {
      about: richTextToHTML(profile.about?.json, profile.about?.links),
      avatar: profile.avatar?.url!,
      bio: richTextToHTML(profile.bio?.json, profile.bio?.links),
      name: profile?.name!,
      social: social
        .map((item: any) => item!)
        .map((item: any) => ({ name: item.name.toLocaleLowerCase(), url: item.url! })),
    };
  },
  max: 1,
  ttl: DAY,
});

async function loader({ preview = false }: LoaderParams = {}): Promise<Profile> {
  return (await cache.fetch('profile', { context: { preview }, forceRefresh: preview }))!;
}

export type { Profile };

export default loader;
