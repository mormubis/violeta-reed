import type { Config } from '@react-router/dev/config';

export default {
  prerender: ['/', '/libros', '/robots.txt'],
  ssr: false,
} satisfies Config;
