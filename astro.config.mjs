import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  // Tu URL basada en el usuario de la imagen
  site: 'https://Andrewsscorp.github.io',
  // El nombre del repositorio que creaste (ejemplo: page-gif)
  base: '/page-gif', 
  integrations: [tailwind(), react()],
});