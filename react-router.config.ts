import type { Config } from '@react-router/dev/config';

export default {
  prerender: ['/', '/libros'],
  ssr: false,
} satisfies Config;
