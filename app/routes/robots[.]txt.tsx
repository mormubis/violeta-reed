import type { LoaderFunction } from '@remix-run/node';

const loader: LoaderFunction = () => {
  const body = 'User-Agent: *\nAllow: /\n';
  return new Response(body);
};

export { loader };
