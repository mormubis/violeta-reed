import { reactRouter } from '@react-router/dev/vite';
import graphql from '@rollup/plugin-graphql';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [graphql(), tailwindcss(), reactRouter(), tsconfigPaths()],
});
