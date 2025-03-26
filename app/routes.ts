import { index, route } from '@react-router/dev/routes';

import type { RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('libros', 'routes/books.tsx'),
  route('robots.txt', 'routes/robots[.]txt.tsx'),
] satisfies RouteConfig;
