import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const { VITE_SITE_URL } = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [
      react(),
      {
        name: 'cadna-social-image-url',
        transformIndexHtml(html) {
          if (!VITE_SITE_URL) return html;
          const imageUrl = new URL('/images/cadna/cadna-social.jpg', VITE_SITE_URL).href;
          return html.replaceAll('content="/images/cadna/cadna-social.jpg"', `content="${imageUrl}"`);
        },
      },
    ],
  };
});
