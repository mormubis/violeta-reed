import type { ProfileQuery, ProfileQueryVariables } from '~/.graphql/types';

import graphql, { gql } from '~/lib/graphql';
import richTextToHTML from '~/lib/richTextToHTML';

import type { Props } from '~/components/LinkSocial';

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

const DEFAULT = {
  about: '',
  avatar:
    'https://images.ctfassets.net/v1kazl7nd6vv/vXU5OyezNm0ZVqctsc6In/73ed6eeea572e016e9aac8fd85ec2b79/photo_2022-04-27_22.34.15.jpeg?fm=webp',
  bio: 'Os doy la bienvenida a mi País de las Maravillas. Aquí encontraréis un trocito más de mí.',
  name: 'Violeta Reed',
  social: [],
};

const fragment = gql`
  fragment AboutLinks on ProfileAboutLinks {
    assets {
      block {
        contentType
        description
        height
        sys {
          id
        }
        title
        url(transform: { format: WEBP })
        width
      }
    }
    entries {
      block {
        __typename
        sys {
          id
        }
      }
    }
  }
  fragment BioLinks on ProfileBioLinks {
    assets {
      block {
        contentType
        description
        height
        sys {
          id
        }
        title
        url(transform: { format: WEBP })
        width
      }
    }
    entries {
      block {
        __typename
        sys {
          id
        }
      }
    }
  }
`;

const query = gql`
  ${fragment}
  query Profile($preview: Boolean) {
    profileCollection(limit: 1, preview: $preview) {
      items {
        about {
          json
          links {
            ...AboutLinks
          }
        }
        avatar {
          url(transform: { format: WEBP })
        }
        bio {
          json
          links {
            ...BioLinks
          }
        }
        name
        socialCollection {
          items {
            name
            url
          }
        }
      }
    }
  }
`;

async function loader({ preview = false }: LoaderParams = {}): Promise<Profile> {
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
}

export type { Profile };

export default loader;
