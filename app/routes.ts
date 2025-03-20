import { index, route } from '@react-router/dev/routes';

import type { RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('libros', 'routes/books.tsx'),
] satisfies RouteConfig;
