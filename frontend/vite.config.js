import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslint({
      overrideConfigFile: './.eslintrc.cjs',
      lintOnStart: true,
      failOnError: false
    })
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
}));

// npm install &&  npm run build &&  npm run sequelize --prefix backend db:seed:undo:all &&  npm run sequelize --prefix backend db:migrate:undo:all &&  npm run sequelize --prefix backend db:migrate &&  npm run sequelize --prefix backend db:seed:all